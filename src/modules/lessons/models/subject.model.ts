import mongoose from 'mongoose';
import { ISubject } from '../interfaces/subject';

const subjectSchema = new mongoose.Schema<ISubject>(
  {
    title: {
      type: String,
    },
    chapters: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chapter',
      },
    ],
    icon: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ISubject>('Subject', subjectSchema);
