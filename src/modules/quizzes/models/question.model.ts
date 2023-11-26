import mongoose from 'mongoose';
import { IQuestion } from '../interfaces/question';

const questionSchema = new mongoose.Schema<IQuestion>(
  {
    text: {
      type: String,
    },
    lesson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lesson',
    },
    answers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Answer',
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IQuestion>('Question', questionSchema);
