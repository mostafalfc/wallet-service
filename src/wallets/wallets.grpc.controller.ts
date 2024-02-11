import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  CreateWalletRequestInterface,
  CreateWalletResponseInterface,
  DepositMoneyRequestInterface,
  DepositMoneyResponseInterface,
  GetWalletBalanceResponseInterface,
  WalletsGrpcServiceInterface,
} from './interfaces/wallets-grpc-service.interface';
import { WalletsService } from './wallets.service';

@Controller('wallets-grpc')
export class WalletsGrpController implements WalletsGrpcServiceInterface {
  constructor(private readonly walletService: WalletsService) {}

  @GrpcMethod('WalletService', 'deposit')
  async deposit(
    request: DepositMoneyRequestInterface,
  ): Promise<DepositMoneyResponseInterface> {
    const result = await this.walletService.depositMoneyToWallet({
      amount: request.amount,
      user_id: request.userId,
    });

    return {
      referenceId: result.reference_id,
    };
  }

  @GrpcMethod('WalletService', 'balance')
  async balance(
    request: CreateWalletRequestInterface,
  ): Promise<GetWalletBalanceResponseInterface> {
    return await this.walletService.getWalletBalance(request.userId);
  }

  @GrpcMethod('WalletService', 'createWallet')
  async create(
    request: CreateWalletRequestInterface,
  ): Promise<CreateWalletResponseInterface> {
    const wallet = await this.walletService.create({ user_id: request.userId });
    return {
      _id: wallet._id,
      userId: wallet.user_id,
      balance: wallet.balance,
    };
  }
}
