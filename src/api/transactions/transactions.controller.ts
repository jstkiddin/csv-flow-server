import { JwtAuthGuard } from '@api/users/auth/guards/jwt.guard';
import { GetToken } from '@api/users/decorators/get-token.decorator';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ImportDataDto } from './dtos/transaction.dto';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionService: TransactionsService) {}

  @Post('import')
  @UseGuards(JwtAuthGuard)
  postCSV(@GetToken() email: string, @Body() data: ImportDataDto) {
    return this.transactionService.importTransaction(data, email);
  }
}
