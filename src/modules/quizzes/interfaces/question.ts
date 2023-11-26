import { Document, Types } from 'mongoose';

export interface IQuestion extends Document {
  _id?: Types.ObjectId;
  text: string;
  answers: Types.ObjectId[];
  lesson: Types.ObjectId;
}
