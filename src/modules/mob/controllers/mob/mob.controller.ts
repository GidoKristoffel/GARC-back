import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpStatus,
  UseInterceptors,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { MobService } from '../../services/mob/mob.service';
import {
  IAllMobsResponse,
  ICreatedMobResponse,
  IDeletedMobResponse,
  IMobResponse,
  IUpdatedMobResponse,
} from '../../interfaces/response.interface';
import { IDeletedMob, IMob } from '../../interfaces/common.interface';
import { MobDto } from '../../dto';

@Controller('admin/mob')
export class MobController {
  constructor(private mobService: MobService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getAllMobs(): Promise<IAllMobsResponse> {
    const mobs: IMob[] | null = await this.mobService.findAll();
    return {
      mobs,
      status: mobs ? HttpStatus.FOUND : HttpStatus.NOT_FOUND,
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async findOneMob(@Param('id') id: string): Promise<IMobResponse> {
    const mob: IMob | null = await this.mobService.findOne(id);
    return {
      mob,
      status: mob ? HttpStatus.FOUND : HttpStatus.NOT_FOUND,
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async createMob(@Body() dto: MobDto): Promise<ICreatedMobResponse | void> {
    const mob: IMob | null = await this.mobService.create(dto);
    return {
      mob,
      status: mob ? HttpStatus.CREATED : HttpStatus.BAD_REQUEST,
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch(':id')
  async updateCharacter(
    @Param('id') id: string,
    @Body() dto: MobDto,
  ): Promise<IUpdatedMobResponse> {
    const mob: IMob | null = await this.mobService.update(id, dto);
    return {
      mob,
      status: mob ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  async deleteCharacter(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<IDeletedMobResponse> {
    const mob: IDeletedMob = await this.mobService.delete(id);
    return {
      mob,
      status: mob ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
    };
  }
}
