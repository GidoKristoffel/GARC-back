import { Test, TestingModule } from '@nestjs/testing';
import { ArtifactLevelingCategoryController } from './artifact-leveling-category.controller';

describe('ArtifactLevelingCategoryController', () => {
  let controller: ArtifactLevelingCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArtifactLevelingCategoryController],
    }).compile();

    controller = module.get<ArtifactLevelingCategoryController>(ArtifactLevelingCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
