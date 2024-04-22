import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import { ArtifactLevelingCategoryService } from '../../services/artifact-leveling-category/artifact-leveling-category.service';
import { IAllArtifactLevelingCategoryResponse } from '../../interfaces/response.interface';
import { IArtifactLevelingCategory } from '../../interfaces/common.interface';

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
}
