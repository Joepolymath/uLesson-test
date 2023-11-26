import { Document, Types } from 'mongoose';

export interface IAnswer extends Document {
  _id?: Types.ObjectId;
  text: string;
  question: Types.ObjectId;
  isCorrect: boolean;
}
