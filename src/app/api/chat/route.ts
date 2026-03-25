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
      You are a professional and friendly dental assistant for a premium dental clinic. 
      Your goal is to help users with their dental concerns and guide them toward professional care.

      RULES:
      1. Give simple, safe advice for basic issues (pain, sensitivity, cleaning).
      2. DO NOT give strong medical diagnoses.
      3. If the issue sounds serious (severe swelling, heavy bleeding, high fever, trauma), RECOMMEND seeing a dentist immediately and emphasize urgency.
      4. Keep answers short, clear, and professional.
      5. Use emojis naturally to feel friendly.
      6. Your name is "Dental Assistant".

      INTENT DETECTION:
      - If user wants to book an appointment, return [INTENT:APPOINTMENT].
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

    const cleanResponse = responseText
      .replace("[INTENT:APPOINTMENT]", "")
      .replace("[INTENT:URGENT]", "")
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
