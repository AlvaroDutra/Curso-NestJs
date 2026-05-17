import { Controller, Get, Inject } from '@nestjs/common';
import * as config from '@nestjs/config';
import { AppService } from './app.service';
import globalConfig from '../global-config/global.config';

@Controller('home')
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(globalConfig.KEY)
    private readonly globalConfiguration: config.ConfigType<
      typeof globalConfig
    >,
  ) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }
}
