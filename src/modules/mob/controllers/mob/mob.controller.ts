import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import { Mob } from '@prisma/client';

@Controller('mob')
export class MobController {
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getAllMobs(): Promise<IAllMobsResponse> {
    const character: Mob[] | null = await this.mobService.findAll();
    return {
      character,
      status: character ? HttpStatus.FOUND : HttpStatus.NOT_FOUND,
    };
  }
}
