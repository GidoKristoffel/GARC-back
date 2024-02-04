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
import { EnhancementMaterialService } from '../../services/enhancement-material/enhancement-material.service';
import {
  IAllEnhancementMaterialsResponse,
  ICreatedEnhancementMaterialResponse,
  IDeletedEnhancementMaterialResponse,
  IEnhancementMaterialResponse,
  IUpdatedEnhancementMaterialResponse,
} from '../../interfaces/response.interface';
import {
  IDeletedEnhancementMaterial,
  IEnhancementMaterial,
} from '../../interfaces/common.interface';
import { EnhancementMaterialDto } from '../../dto';

@Controller('admin/enhancement-material')
export class EnhancementMaterialController {
  constructor(private enhancementMaterialService: EnhancementMaterialService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getAllEnhancementMaterials(): Promise<IAllEnhancementMaterialsResponse> {
    const enhancementMaterials: IEnhancementMaterial[] | null =
      await this.enhancementMaterialService.findAll();
    return {
      enhancementMaterials,
      status: enhancementMaterials ? HttpStatus.FOUND : HttpStatus.NOT_FOUND,
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async findOneEnhancementMaterial(
    @Param('id') id: string,
  ): Promise<IEnhancementMaterialResponse> {
    const enhancementMaterial: IEnhancementMaterial | null =
      await this.enhancementMaterialService.findOne(id);
    return {
      enhancementMaterial,
      status: enhancementMaterial ? HttpStatus.FOUND : HttpStatus.NOT_FOUND,
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async createEnhancementMaterial(
    @Body() dto: EnhancementMaterialDto,
  ): Promise<ICreatedEnhancementMaterialResponse | void> {
    const enhancementMaterial: IEnhancementMaterial | null =
      await this.enhancementMaterialService.create(dto);
    return {
      enhancementMaterial,
      status: enhancementMaterial ? HttpStatus.CREATED : HttpStatus.BAD_REQUEST,
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch(':id')
  async updateEnhancementMaterial(
    @Param('id') id: string,
    @Body() dto: EnhancementMaterialDto,
  ): Promise<IUpdatedEnhancementMaterialResponse> {
    const enhancementMaterial: IEnhancementMaterial | null =
      await this.enhancementMaterialService.update(id, dto);
    return {
      enhancementMaterial,
      status: enhancementMaterial ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  async deleteCharacter(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<IDeletedEnhancementMaterialResponse> {
    const enhancementMaterial: IDeletedEnhancementMaterial =
      await this.enhancementMaterialService.delete(id);
    return {
      enhancementMaterial,
      status: enhancementMaterial ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
    };
  }
}
