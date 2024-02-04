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
import { TalentMaterialService } from '../../services/talent-material/talent-material.service';
import {
  IAllTalentMaterialsResponse,
  ICreatedTalentMaterialResponse,
  IDeletedTalentMaterialResponse,
  ITalentMaterialResponse,
  IUpdatedTalentMaterialResponse,
} from '../../interfaces/response.interface';
import {
  IDeletedTalentMaterial,
  ITalentMaterial,
} from '../../interfaces/common.interface';
import { TalentMaterialDto } from '../../dto';

@Controller('admin/talent-material')
export class TalentMaterialController {
  constructor(private talentMaterialService: TalentMaterialService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getAllTalentMaterials(): Promise<IAllTalentMaterialsResponse> {
    const talentMaterials: ITalentMaterial[] | null =
      await this.talentMaterialService.findAll();
    return {
      talentMaterials,
      status: talentMaterials ? HttpStatus.FOUND : HttpStatus.NOT_FOUND,
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async findOneTalentMaterial(
    @Param('id') id: string,
  ): Promise<ITalentMaterialResponse> {
    const talentMaterial: ITalentMaterial | null =
      await this.talentMaterialService.findOne(id);
    return {
      talentMaterial,
      status: talentMaterial ? HttpStatus.FOUND : HttpStatus.NOT_FOUND,
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async createTalentMaterial(
    @Body() dto: TalentMaterialDto,
  ): Promise<ICreatedTalentMaterialResponse | void> {
    const talentMaterial: ITalentMaterial | null =
      await this.talentMaterialService.create(dto);
    return {
      talentMaterial,
      status: talentMaterial ? HttpStatus.CREATED : HttpStatus.BAD_REQUEST,
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch(':id')
  async updateTalentMaterial(
    @Param('id') id: string,
    @Body() dto: TalentMaterialDto,
  ): Promise<IUpdatedTalentMaterialResponse> {
    const talentMaterial: ITalentMaterial | null =
      await this.talentMaterialService.update(id, dto);
    return {
      talentMaterial,
      status: talentMaterial ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  async deleteCharacter(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<IDeletedTalentMaterialResponse> {
    const talentMaterial: IDeletedTalentMaterial =
      await this.talentMaterialService.delete(id);
    return {
      talentMaterial,
      status: talentMaterial ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
    };
  }
}
