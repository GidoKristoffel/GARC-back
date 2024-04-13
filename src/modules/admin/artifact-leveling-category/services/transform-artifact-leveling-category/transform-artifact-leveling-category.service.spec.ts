import { Test, TestingModule } from '@nestjs/testing';
import { TransformArtifactLevelingCategoryService } from './transform-artifact-leveling-category.service';

describe('TransformArtifactLevelingCategoryService', () => {
  let service: TransformArtifactLevelingCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransformArtifactLevelingCategoryService],
    }).compile();

    service = module.get<TransformArtifactLevelingCategoryService>(TransformArtifactLevelingCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
