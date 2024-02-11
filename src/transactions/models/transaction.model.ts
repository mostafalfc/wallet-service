import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { BaseModel } from 'src/base/models/base.model';
import { Wallet } from 'src/wallets/models/wallet.model';
import { TransactionInterface } from '../interfaces/transaction.interface';

@Schema({
  versionKey: false,
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class Transaction extends BaseModel implements TransactionInterface {
  @Prop({ type: String, required: true, ref: Wallet.name })
  wallet_id: string;

  @Prop({ type: mongoose.Types.Decimal128, required: true })
  amount: number;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
