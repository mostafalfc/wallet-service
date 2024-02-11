import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DepositMoneyDto } from './dtos/deposit-money.dto';
import { WalletBalanceDto } from './dtos/wallet-balance.dto';
import { Wallet } from './models/wallet.model';

@Injectable()
export class WalletsRepository {
  constructor(
    @InjectModel(Wallet.name) private readonly walletModel: Model<Wallet>,
  ) {}

  async create(userId: string): Promise<Wallet> {
    return this.walletModel.create({ user_id: userId });
  }

  async findOneByUserId(userId: string): Promise<Wallet> {
    const wallet = await this.walletModel.findOne({ user_id: userId });
    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }
    return wallet;
  }

  async getBalance(userId: string): Promise<WalletBalanceDto> {
    const wallet = await this.findOneByUserId(userId);
    return { balance: wallet.balance };
  }

  async deposit(input: DepositMoneyDto): Promise<string> {
    const wallet = await this.findOneByUserId(input.user_id);
    wallet.balance += input.amount;
    await wallet.save();
    return wallet._id;
  }
}
