import { Controller, Get } from '@nestjs/common';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionService: TransactionsService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
}
