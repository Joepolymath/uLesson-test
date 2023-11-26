import mongoose from 'mongoose';
import { IChapter } from '../interfaces/chapter';

const chapterSchema = new mongoose.Schema<IChapter>(
  {
    title: {
      type: String,
    },
    serialNo: {
      type: Number,
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject',
    },
    img: {
      type: String,
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IChapter>('Chapter', chapterSchema);
