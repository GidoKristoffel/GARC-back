import { Test, TestingModule } from '@nestjs/testing';
import { ArtifactLevelingCategoryService } from './artifact-leveling-category.service';

describe('ArtifactLevelingCategoryService', () => {
  let service: ArtifactLevelingCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArtifactLevelingCategoryService],
    }).compile();

    service = module.get<ArtifactLevelingCategoryService>(ArtifactLevelingCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
