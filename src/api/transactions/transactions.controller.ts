import { Controller, Get } from '@nestjs/common';
import { TransactionsService } from './transactions.service';

@Controller()
export class TransactionsController {
  constructor(private readonly appService: TransactionsService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
