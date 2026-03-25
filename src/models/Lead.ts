import mongoose, { Schema, model, models } from "mongoose";

const LeadSchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    problem: { type: String },
    status: { 
      type: String, 
      enum: ["New", "Contacted", "Booked", "Completed", "Cancelled"], 
      default: "New" 
    },
    intent: { type: String },
    source: { type: String, default: "Chatbot" },
  },
  { timestamps: true }
);

const Lead = models.Lead || model("Lead", LeadSchema);

export default Lead;
