import { Controller, Get, OnModuleInit } from '@nestjs/common';
import { AppService } from './app.service';
import { SuperUserService } from './core/services/super-user/super-user.service';

@Controller()
export class AppController implements OnModuleInit {
  constructor(
    private readonly appService: AppService,
    private readonly superUser: SuperUserService,
  ) {}

  onModuleInit(): void {
    this.superUser.init().then();
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
