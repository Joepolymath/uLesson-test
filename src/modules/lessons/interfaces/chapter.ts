import { Document, Types } from 'mongoose';

export interface IChapter extends Document {
  _id?: Types.ObjectId;
  title: string;
  serialNo: number;
  subject: Types.ObjectId;
  img: string;
  categories: Types.ObjectId[];
}
