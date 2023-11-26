import mongoose from 'mongoose';
import { ICategory } from '../interfaces/categories';

const categorySchema = new mongoose.Schema<ICategory>(
  {
    title: {
      type: String,
    },
    chapter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject',
    },
    lessons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson',
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ICategory>('Category', categorySchema);
