export interface WalletsGrpcServiceInterface {
  create(
    request: CreateWalletRequestInterface,
  ): Promise<CreateWalletResponseInterface>;

  balance(
    request: CreateWalletRequestInterface,
  ): Promise<GetWalletBalanceResponseInterface>;

  deposit(
    request: DepositMoneyRequestInterface,
  ): Promise<DepositMoneyResponseInterface>;
}
export interface CreateWalletRequestInterface {
  userId: string;
}
export interface CreateWalletResponseInterface {
  _id: string;
  userId: string;
  balance: number;
}

export interface GetWalletBalanceResponseInterface {
  balance: number;
}

export interface DepositMoneyRequestInterface {
  userId: string;
  amount: number;
}

export interface DepositMoneyResponseInterface {
  referenceId: string;
}
