import { Module } from '@nestjs/common';
import { ArtifactLevelingCategoryController } from './controllers/artifact-leveling-category/artifact-leveling-category.controller';

@Module({
  controllers: [ArtifactLevelingCategoryController]
})
export class ArtifactLevelingCategoryModule {}
