import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateWalletDto } from './dtos/create-wallet.dto';
import { DepositMoneyDto } from './dtos/deposit-money.dto';
import { DepositResponseDto } from './dtos/deposit-response.dto';
import { WalletBalanceDto } from './dtos/wallet-balance.dto';
import { Wallet } from './models/wallet.model';
import { WalletsService } from './wallets.service';

@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Post()
  async createWallet(@Body() body: CreateWalletDto): Promise<Wallet> {
    return await this.walletsService.create(body);
  }

  @Get('/balance/:user_id')
  async getBalance(
    @Param('user_id') userId: string,
  ): Promise<WalletBalanceDto> {
    return await this.walletsService.getWalletBalance(userId);
  }

  @Post('/deposit')
  async depositToWallet(
    @Body() body: DepositMoneyDto,
  ): Promise<DepositResponseDto> {
    return await this.walletsService.depositMoneyToWallet(body);
  }
}
