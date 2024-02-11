import { Type } from 'class-transformer';

export class WalletBalanceDto {
  @Type(() => Number)
  balance: number;
}
