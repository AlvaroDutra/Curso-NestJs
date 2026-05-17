import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import appConfig from './app.config';
import * as config from '@nestjs/config';

@Controller('home')
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(appConfig.KEY)
    private readonly appConfiguration: config.ConfigType<typeof appConfig>,
  ) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }
}
