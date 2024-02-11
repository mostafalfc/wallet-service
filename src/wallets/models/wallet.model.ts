import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { BaseModel } from 'src/base/models/base.model';
import { WalletModelInterface as WalletInterface } from '../interfaces/wallet.interface';

@Schema({
  versionKey: false,
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class Wallet extends BaseModel implements WalletInterface {
  @Prop({ type: String, required: true, unique: true })
  user_id: string;

  @Prop({ type: mongoose.Types.Decimal128, required: true, default: 0 })
  balance: number;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
