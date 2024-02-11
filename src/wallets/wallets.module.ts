import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LogsModule } from 'src/logs/logs.module';
import { TransactionsModule } from 'src/transactions/transactions.module';
import { TotalWalletTransaction } from './jobs/total-wallet-transaction.job';
import { Wallet, WalletSchema } from './models/wallet.model';
import { WalletsController } from './wallets.controller';
import { WalletsGrpController } from './wallets.grpc.controller';
import { WalletsRepository } from './wallets.repository';
import { WalletsService } from './wallets.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Wallet.name,
        schema: WalletSchema,
      },
    ]),
    BullModule.registerQueue({
      name: 'jobs',
    }),
    TransactionsModule,
    LogsModule,
  ],
  providers: [WalletsService, WalletsRepository, TotalWalletTransaction],
  controllers: [WalletsController, WalletsGrpController],
})
export class WalletsModule {}
