import { BaseModelInterface } from 'src/base/interfaces/base-model.interface';

export interface TransactionInterface extends BaseModelInterface {
  wallet_id: string;
  amount: number;
}
