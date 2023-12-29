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
import { LevelUpMaterialService } from '../../services/level-up-material/level-up-material.service';
import {
  IAllLevelUpMaterialsResponse,
  ICreatedLevelUpMaterialResponse,
  IDeletedLevelUpMaterialResponse,
  ILevelUpMaterialResponse,
  IUpdatedLevelUpMaterialResponse,
} from '../../interfaces/response.interface';
import {
  IDeletedLevelUpMaterial,
  ILevelUpMaterial,
} from '../../interfaces/common.interface';
import { LevelUpMaterialDto } from '../../dto';

@Controller('admin/level-up-material')
export class LevelUpMaterialController {
  constructor(private levelUpMaterialService: LevelUpMaterialService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getAllLevelUpMaterials(): Promise<IAllLevelUpMaterialsResponse> {
    const levelUpMaterials: ILevelUpMaterial[] | null =
      await this.levelUpMaterialService.findAll();
    return {
      levelUpMaterials,
      status: levelUpMaterials ? HttpStatus.FOUND : HttpStatus.NOT_FOUND,
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async findOneLevelUpMaterial(
    @Param('id') id: string,
  ): Promise<ILevelUpMaterialResponse> {
    const levelUpMaterial: ILevelUpMaterial | null =
      await this.levelUpMaterialService.findOne(id);
    return {
      levelUpMaterial,
      status: levelUpMaterial ? HttpStatus.FOUND : HttpStatus.NOT_FOUND,
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async createLevelUpMaterial(
    @Body() dto: LevelUpMaterialDto,
  ): Promise<ICreatedLevelUpMaterialResponse | void> {
    const levelUpMaterial: ILevelUpMaterial | null =
      await this.levelUpMaterialService.create(dto);
    return {
      levelUpMaterial,
      status: levelUpMaterial ? HttpStatus.CREATED : HttpStatus.BAD_REQUEST,
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch(':id')
  async updateLevelUpMaterial(
    @Param('id') id: string,
    @Body() dto: LevelUpMaterialDto,
  ): Promise<IUpdatedLevelUpMaterialResponse> {
    const levelUpMaterial: ILevelUpMaterial | null =
      await this.levelUpMaterialService.update(id, dto);
    return {
      levelUpMaterial,
      status: levelUpMaterial ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  async deleteCharacter(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<IDeletedLevelUpMaterialResponse> {
    const levelUpMaterial: IDeletedLevelUpMaterial =
      await this.levelUpMaterialService.delete(id);
    return {
      levelUpMaterial,
      status: levelUpMaterial ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
    };
  }
}
