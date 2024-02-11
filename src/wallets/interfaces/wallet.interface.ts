import { BaseModelInterface } from 'src/base/interfaces/base-model.interface';

export interface WalletModelInterface extends BaseModelInterface {
  user_id: string;
  balance: number;
}
