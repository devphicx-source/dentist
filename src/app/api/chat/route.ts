import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dbConnect from "@/lib/mongodb";
import Lead from "@/models/Lead";

export async function POST(req: Request) {
  try {
    const key = (process.env.GEMINI_API_KEY || "").trim().replace(/[\r\n]/g, "");
    console.log("API Key loaded (length):", key.length);
    const genAI = new GoogleGenerativeAI(key);
    
    const { message, history, stage, userData } = await req.json();

    // If we are in the booking stage, handle lead capture
    if (stage === "booking_complete") {
      await dbConnect();
      const newLead = new Lead({
        ...userData,
        source: "Chatbot",
      });
      await newLead.save();
      return NextResponse.json({ success: true, message: "Lead saved." });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const systemPrompt = `
      You are "Dr. Agrawal's Dental Assistant", a professional and friendly assistant for Agrawal Dental Care Indore. 
      Your goal is to help users with their dental concerns and guide them toward professional care by Dr. Navneet Agrawal.

      CLINIC INFO:
      - Clinic Name: Agrawal Dental Care Indore
      - Doctor: Dr. Navneet Agrawal (BDS, MDS - Pediatric & Preventive Dentistry)
      - Specialization: Pediatric Dentist, Pedodontist, Child Dentist.
      - Location: MZ1, Onam Plaza, AB Rd, Near Industry House, New Palasia, Indore, MP 452001.
      - Phone: +91 99774 51132
      - Hours: Mon – Sat (11:00 AM – 8:00 PM), Sunday (Closed).
      - Services: Infant Oral Health, Preventive Care, Cavity Fillings, Braces & Aligners, Habit Counseling, Emergency Care.

      RULES:
      1. Give simple, safe advice for basic pediatric dental issues.
      2. If the user mentions a specific problem (pain, cavity, bleeding, broken tooth, etc.), ALWAYS conclude by suggesting a checkup.
      3. DO NOT give strong medical diagnoses.
      4. If the issue sounds serious, RECOMMEND seeing Dr. Agrawal immediately.
      5. Keep answers short, clear, and professional.
      6. Your name is "Dr. Agrawal's Assistant".

      INTENT DETECTION:
      - If user wants to book an appointment, return [INTENT:APPOINTMENT].
      - If user describes a dental problem/pain or if you suggest a checkup, return [INTENT:PROBLEM].
      - If issue is very serious, return [INTENT:URGENT].
      - Otherwise, respond normally.
    `;

    const chat = model.startChat({
      history: [
        { role: "user", parts: [{ text: systemPrompt }] },
        { role: "model", parts: [{ text: "Understood. I am your professional Dental Assistant. How can I help you today?" }] },
        ...(history || []),
      ],
    });

    const result = await chat.sendMessage(message);
    const responseText = result.response.text();

    let intent = "normal";
    if (responseText.includes("[INTENT:APPOINTMENT]")) intent = "appointment";
    if (responseText.includes("[INTENT:URGENT]")) intent = "urgent";
    if (responseText.includes("[INTENT:PROBLEM]")) intent = "problem";

    const cleanResponse = responseText
      .replace("[INTENT:APPOINTMENT]", "")
      .replace("[INTENT:URGENT]", "")
      .replace("[INTENT:PROBLEM]", "")
      .trim();

    return NextResponse.json({
      message: cleanResponse,
      intent,
    });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { message: "Sorry, I'm having trouble connecting right now." },
      { status: 500 }
    );
  }
}
