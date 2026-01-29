// lib/mongodb/models/Interview.ts
import mongoose, { Schema, model, models } from "mongoose";

const InterviewSchema = new Schema({
  title: String,
  date: Date,
  candidate: String,
  notes: String,
});

const Interview = models.Interview || model("Interview", InterviewSchema);
export default Interview;
