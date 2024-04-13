import { Module } from '@nestjs/common';
import { ArtifactLevelingCategoryController } from './controllers/artifact-leveling-category/artifact-leveling-category.controller';
import { ArtifactLevelingCategoryService } from './services/artifact-leveling-category/artifact-leveling-category.service';
import { TransformArtifactLevelingCategoryService } from './services/transform-artifact-leveling-category/transform-artifact-leveling-category.service';

@Module({
  controllers: [ArtifactLevelingCategoryController],
  providers: [ArtifactLevelingCategoryService, TransformArtifactLevelingCategoryService]
})
export class ArtifactLevelingCategoryModule {}
