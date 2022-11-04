import { Body, Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CounterRequestDto } from './dto/counter.request';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('counter')
  async queryCounter(@Body() dto: CounterRequestDto) {
    return await this.appService.queryCounter(dto);
  }
}
