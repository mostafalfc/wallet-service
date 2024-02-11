import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDefined, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DepositMoneyDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, required: true })
  user_id: string;

  @IsNumber()
  @IsDefined()
  @ApiProperty({ type: Number, required: true })
  @Type(() => Number)
  amount: number;
}
