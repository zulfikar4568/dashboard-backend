import { Body, Controller, Post, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { CounterRequestDto } from './dto/counter.request';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('counter')
  async queryCounter(@Body() dto: CounterRequestDto) {
    const data = await this.appService.queryCounter(dto);

    return {
      status: HttpStatus.OK,
      data,
    }
  }
}
