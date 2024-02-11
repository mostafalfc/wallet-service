import { Injectable } from '@nestjs/common';
import { LogEvents } from 'src/logs/enums/log-events.enum';
import { LogsService } from 'src/logs/logs.service';
import { TransactionsService } from 'src/transactions/transactions.service';
import { CreateWalletDto } from './dtos/create-wallet.dto';
import { DepositMoneyDto } from './dtos/deposit-money.dto';
import { DepositResponseDto } from './dtos/deposit-response.dto';
import { WalletBalanceDto } from './dtos/wallet-balance.dto';
import { Wallet } from './models/wallet.model';
import { WalletsRepository } from './wallets.repository';

@Injectable()
export class WalletsService {
  constructor(
    private readonly logsService: LogsService,
    private readonly walletsRepository: WalletsRepository,
    private readonly transactionsService: TransactionsService,
  ) {}

  async create(input: CreateWalletDto): Promise<Wallet> {
    return await this.walletsRepository.create(input.user_id);
  }

  async getWalletBalance(userId: string): Promise<WalletBalanceDto> {
    return await this.walletsRepository.getBalance(userId);
  }

  async depositMoneyToWallet(
    input: DepositMoneyDto,
  ): Promise<DepositResponseDto> {
    const wallet_id = await this.walletsRepository.deposit(input);
    try {
      const transaction = await this.transactionsService.create({
        wallet_id,
        amount: input.amount,
      });
      await this.logsService.createTransactionLog({
        event: LogEvents.TRANSACTION,
        data: {
          amount: input.amount,
          wallet_id,
          date: new Date(),
        },
      });
      return {
        reference_id: transaction._id,
      };
    } catch (error) {
      await this.walletsRepository.deposit({
        amount: input.amount * -1,
        user_id: input.user_id,
      });

      throw error;
    }
  }
}
