import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { Logger, OnApplicationBootstrap } from '@nestjs/common';
import { CronExpression } from '@nestjs/schedule';
import { Queue } from 'bull';
import { DateTime } from 'luxon';
import { LogEvents } from 'src/logs/enums/log-events.enum';
import { LogsService } from 'src/logs/logs.service';
import { TransactionsService } from 'src/transactions/transactions.service';

@Processor('jobs')
export class TotalWalletTransaction implements OnApplicationBootstrap {
  constructor(
    @InjectQueue('jobs') private queue: Queue,
    private readonly transactionService: TransactionsService,
    private readonly logsService: LogsService,
  ) {}

  logger = new Logger(TotalWalletTransaction.name);
  async onApplicationBootstrap(): Promise<void> {
    await this.queue.add('total_wallet_transaction', '', {
      repeat: {
        cron: CronExpression.EVERY_MINUTE,
      },
      jobId: 'total_wallet_transaction',
      removeOnComplete: true,
    });
  }

  @Process('total_wallet_transaction')
  async run(): Promise<void> {
    const now = new Date().toISOString();
    const from_date = DateTime.fromISO(now)
      .minus({ day: 1 })
      .startOf('day')
      .toJSDate();
    const to_date = DateTime.fromISO(now)
      .minus({ day: 1 })
      .endOf('day')
      .toJSDate();
    const wallets =
      await this.transactionService.sumWalletTransactionsBetweenDates(
        from_date,
        to_date,
      );

    for (const wallet of wallets) {
      await this.logsService.createDailyLog({
        event: LogEvents.DAILY_BALANCE,
        data: {
          wallet_id: wallet._id,
          balance: wallet.sum,
          date: from_date,
        },
      });
    }
  }
}
