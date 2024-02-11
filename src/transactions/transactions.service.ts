import { Injectable } from '@nestjs/common';
import { SumWalletTransactionDto } from 'src/wallets/dtos/sum-wallet-transaction.dto';
import { CreateTransactionDto } from './dtos/create-transaction.dto';
import { Transaction } from './models/transaction.model';
import { TransactionsRepository } from './transactions.repository';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
  ) {}

  async create(input: CreateTransactionDto): Promise<Transaction> {
    return await this.transactionsRepository.create(input);
  }

  async sumWalletTransactionsBetweenDates(
    fromDate: Date,
    toDate: Date,
  ): Promise<SumWalletTransactionDto[]> {
    return await this.transactionsRepository.sumWalletTransactionsBetweenDates(
      fromDate,
      toDate,
    );
  }
}
