import mongoose from 'mongoose';
import { ILesson } from '../interfaces/lesson';

const lessonSchema = new mongoose.Schema<ILesson>(
  {
    title: {
      type: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
    videoUrl: {
      type: String,
    },
    duration: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ILesson>('Lesson', lessonSchema);
