import { Document, Types } from 'mongoose';

export interface ICategory extends Document {
  _id?: Types.ObjectId;
  title: string;
  chapter: Types.ObjectId;
  lessons: Types.ObjectId[];
}
