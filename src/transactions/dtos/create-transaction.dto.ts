import { IsDefined, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  @IsNotEmpty()
  wallet_id: string;

  @IsNumber()
  @IsDefined()
  amount: number;
}
