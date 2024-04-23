import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ArtifactLevelingCategoryService } from '../../services/artifact-leveling-category/artifact-leveling-category.service';
import {
  IAllArtifactLevelingCategoryResponse,
  IArtifactLevelingCategoryResponse,
  ICreatedArtifactLevelingCategoryResponse,
} from '../../interfaces/response.interface';
import { IArtifactLevelingCategory } from '../../interfaces/common.interface';
import {
  IAscensionMaterialResponse,
  ICreatedAscensionMaterialResponse,
} from '../../../ascension-material/interfaces/response.interface';
import { IAscensionMaterial } from '../../../ascension-material/interfaces/common.interface';
import { AscensionMaterialDto } from '../../../ascension-material/dto';
import { ArtifactLevelingCategoryDto } from '../../dto';

@Controller('artifact-leveling-category')
export class ArtifactLevelingCategoryController {
  constructor(
    private artifactLevelingCategoryService: ArtifactLevelingCategoryService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getAllArtifactLevelingCategory(): Promise<IAllArtifactLevelingCategoryResponse> {
    const artifactLevelingCategories: IArtifactLevelingCategory[] | null =
      await this.artifactLevelingCategoryService.findAll();
    return {
      artifactLevelingCategories,
      status: artifactLevelingCategories
        ? HttpStatus.FOUND
        : HttpStatus.NOT_FOUND,
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async findOneArtifactLevelingCategory(
    @Param('id') id: string,
  ): Promise<IArtifactLevelingCategoryResponse> {
    const artifactLevelingCategory: IArtifactLevelingCategory | null =
      await this.artifactLevelingCategoryService.findOne(id);
    return {
      artifactLevelingCategory,
      status: artifactLevelingCategory
        ? HttpStatus.FOUND
        : HttpStatus.NOT_FOUND,
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async createArtifactLevelingCategory(
    @Body() dto: ArtifactLevelingCategoryDto,
  ): Promise<ICreatedArtifactLevelingCategoryResponse | void> {
    const artifactLevelingCategory: IArtifactLevelingCategory | null =
      await this.artifactLevelingCategoryService.create(dto);
    return {
      artifactLevelingCategory,
      status: artifactLevelingCategory
        ? HttpStatus.CREATED
        : HttpStatus.BAD_REQUEST,
    };
  }
}
