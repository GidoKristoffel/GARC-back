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
import { EliteBossService } from '../../services/elite-boss/elite-boss.service';
import {
  IAllEliteBossesResponse,
  ICreatedEliteBossResponse,
  IDeletedEliteBossResponse,
  IEliteBossResponse,
  IUpdatedEliteBossResponse,
} from '../../interfaces/response.interface';
import {
  IDeletedEliteBoss,
  IEliteBoss,
} from '../../interfaces/common.interface';
import { EliteBossDto } from '../../dto';

@Controller('admin/elite-boss')
export class EliteBossController {
  constructor(private eliteBossService: EliteBossService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getAllMobs(): Promise<IAllEliteBossesResponse> {
    const eliteBosses: IEliteBoss[] | null =
      await this.eliteBossService.findAll();
    return {
      eliteBosses,
      status: eliteBosses ? HttpStatus.FOUND : HttpStatus.NOT_FOUND,
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async findOneMob(@Param('id') id: string): Promise<IEliteBossResponse> {
    const eliteBoss: IEliteBoss | null =
      await this.eliteBossService.findOne(id);
    return {
      eliteBoss,
      status: eliteBoss ? HttpStatus.FOUND : HttpStatus.NOT_FOUND,
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async createMob(
    @Body() dto: EliteBossDto,
  ): Promise<ICreatedEliteBossResponse | void> {
    const eliteBoss: IEliteBoss | null =
      await this.eliteBossService.create(dto);
    return {
      eliteBoss,
      status: eliteBoss ? HttpStatus.CREATED : HttpStatus.BAD_REQUEST,
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch(':id')
  async updateCharacter(
    @Param('id') id: string,
    @Body() dto: EliteBossDto,
  ): Promise<IUpdatedEliteBossResponse> {
    const eliteBoss: IEliteBoss | null = await this.eliteBossService.update(
      id,
      dto,
    );
    return {
      eliteBoss,
      status: eliteBoss ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  async deleteCharacter(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<IDeletedEliteBossResponse> {
    const eliteBoss: IDeletedEliteBoss = await this.eliteBossService.delete(id);
    return {
      eliteBoss,
      status: eliteBoss ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
    };
  }
}
