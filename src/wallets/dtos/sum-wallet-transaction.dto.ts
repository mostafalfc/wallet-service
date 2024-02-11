import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class SumWalletTransactionDto {
  @IsString()
  _id: string;

  @IsNumber()
  @Type(() => Number)
  sum: number;
}
