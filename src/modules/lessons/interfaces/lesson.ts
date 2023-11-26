import { Document, Types } from 'mongoose';

export interface ILesson extends Document {
  _id?: Types.ObjectId;
  title: string;
  category: Types.ObjectId;
  videoUrl: string;
  duration: string;
  thumbnail: string;
}
