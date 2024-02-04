import { Test, TestingModule } from '@nestjs/testing';
import { LevelUpMaterialService } from './level-up-material.service';

describe('LevelUpMaterialService', () => {
  let service: LevelUpMaterialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LevelUpMaterialService],
    }).compile();

    service = module.get<LevelUpMaterialService>(LevelUpMaterialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
