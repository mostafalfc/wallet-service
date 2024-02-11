import { Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseModelInterface } from '../interfaces/base-model.interface';

@Schema({
  versionKey: false,
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class BaseModel extends Document implements BaseModelInterface {
  _id: string;
  created_at: Date;
  updated_at: Date;
}
