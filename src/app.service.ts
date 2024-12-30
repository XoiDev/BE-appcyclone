import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  // @Cron(CronExpression.EVERY_SECOND) // Runs every minute
  // async handleDiscounts() {
  //   console.log('alo ne');
  // }
}
