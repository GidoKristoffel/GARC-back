import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpStatus,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { ArtifactLevelingCategoryService } from '../../services/artifact-leveling-category/artifact-leveling-category.service';
import {
  IAllArtifactLevelingCategoryResponse,
  IArtifactLevelingCategoryResponse,
} from '../../interfaces/response.interface';
import { IArtifactLevelingCategory } from '../../interfaces/common.interface';
import { IAscensionMaterialResponse } from '../../../ascension-material/interfaces/response.interface';
import { IAscensionMaterial } from '../../../ascension-material/interfaces/common.interface';

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
}
