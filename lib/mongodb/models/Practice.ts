import mongoose, { Schema, models } from "mongoose";

const PracticeAnswerSchema = new mongoose.Schema({
  questionId: Number,
  question: String,
  category: String,
  userAnswer: String,
  score: Number,
});

const PracticeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  interviewType: {
    type: String,
    enum: ['technical', 'behavioral', 'mixed'],
    required: true,
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  answers: [PracticeAnswerSchema],
  totalScore: {
    type: Number,
    default: 0,
  },
  maxScore: {
    type: Number,
    default: 100,
  },
  percentageScore: {
    type: Number,
    default: 0,
  },
  duration: Number, // in seconds
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Practice || mongoose.model('Practice', PracticeSchema);
