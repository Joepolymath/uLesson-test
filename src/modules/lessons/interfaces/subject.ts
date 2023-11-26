import { Document, Types } from 'mongoose';

export interface ISubject extends Document {
  _id?: Types.ObjectId;
  title: string;
  chapters: Types.ObjectId[];
  icon: string;
}
