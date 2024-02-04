import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { WeeklyBossService } from '../../services/weekly-boss/weekly-boss.service';
import {
  IAllWeeklyBossesResponse,
  ICreatedWeeklyBossResponse,
  IDeletedWeeklyBossResponse,
  IUpdatedWeeklyBossResponse,
  IWeeklyBossResponse,
} from '../../interfaces/response.interface';
import {
  IDeletedWeeklyBoss,
  IWeeklyBoss,
} from '../../interfaces/common.interface';
import { WeeklyBossDto } from '../../dto';

@Controller('admin/weekly-boss')
export class WeeklyBossController {
  constructor(private weeklyBossService: WeeklyBossService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getAllMobs(): Promise<IAllWeeklyBossesResponse> {
    const weeklyBosses: IWeeklyBoss[] | null =
      await this.weeklyBossService.findAll();
    return {
      weeklyBosses,
      status: weeklyBosses ? HttpStatus.FOUND : HttpStatus.NOT_FOUND,
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async findOneMob(@Param('id') id: string): Promise<IWeeklyBossResponse> {
    const weeklyBoss: IWeeklyBoss | null =
      await this.weeklyBossService.findOne(id);
    return {
      weeklyBoss,
      status: weeklyBoss ? HttpStatus.FOUND : HttpStatus.NOT_FOUND,
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async createMob(
    @Body() dto: WeeklyBossDto,
  ): Promise<ICreatedWeeklyBossResponse | void> {
    const weeklyBoss: IWeeklyBoss | null =
      await this.weeklyBossService.create(dto);
    return {
      weeklyBoss,
      status: weeklyBoss ? HttpStatus.CREATED : HttpStatus.BAD_REQUEST,
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch(':id')
  async updateCharacter(
    @Param('id') id: string,
    @Body() dto: WeeklyBossDto,
  ): Promise<IUpdatedWeeklyBossResponse> {
    const weeklyBoss: IWeeklyBoss | null = await this.weeklyBossService.update(
      id,
      dto,
    );
    return {
      weeklyBoss,
      status: weeklyBoss ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  async deleteCharacter(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<IDeletedWeeklyBossResponse> {
    const weeklyBoss: IDeletedWeeklyBoss =
      await this.weeklyBossService.delete(id);
    return {
      weeklyBoss,
      status: weeklyBoss ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
    };
  }
}
