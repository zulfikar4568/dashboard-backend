import { Body, Controller, Post, HttpStatus, Get, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';
import { CounterRequestDto } from './dto/counter.request';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('mfg-order')
  @HttpCode(HttpStatus.OK)
  async getGetMfgOrder() {
    const data = await this.appService.getMfgOrder();

    return {
      status: HttpStatus.OK,
      data,
    }
  }

  @Get('resource-group')
  @HttpCode(HttpStatus.OK)
  async getResourceGroup() {
    const data = await this.appService.getResourceGroup();

    return {
      status: HttpStatus.OK,
      data,
    }
  }

  @Post('counter')
  @HttpCode(HttpStatus.OK)
  async queryCounter(@Body() dto: CounterRequestDto) {
    const data = await this.appService.queryCounter(dto);

    return {
      status: HttpStatus.OK,
      data,
    }
  }
}
