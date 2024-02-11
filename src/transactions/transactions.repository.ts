import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SumWalletTransactionDto } from 'src/wallets/dtos/sum-wallet-transaction.dto';
import { TransactionInterface } from './interfaces/transaction.interface';
import { Transaction } from './models/transaction.model';

@Injectable()
export class TransactionsRepository {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<Transaction>,
  ) {}

  async create(input: Partial<TransactionInterface>): Promise<Transaction> {
    return this.transactionModel.create(input);
  }

  async sumWalletTransactionsBetweenDates(
    fromDate: Date,
    toDate: Date,
  ): Promise<SumWalletTransactionDto[]> {
    return await this.transactionModel.aggregate([
      {
        $match: {
          $and: [
            { created_at: { $gt: fromDate } },
            { created_at: { $lte: toDate } },
          ],
        },
      },
      {
        $group: {
          _id: '$wallet_id',
          sum: {
            $sum: '$amount',
          },
        },
      },
    ]);
  }
}
