import mongoose from 'mongoose';
import { IAnswer } from '../interfaces/answer';

const answerSchema = new mongoose.Schema<IAnswer>(
  {
    text: {
      type: String,
    },
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lesson',
    },
    isCorrect: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IAnswer>('Answer', answerSchema);
