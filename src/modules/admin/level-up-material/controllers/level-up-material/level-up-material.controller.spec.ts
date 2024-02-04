import { Test, TestingModule } from '@nestjs/testing';
import { LevelUpMaterialController } from './level-up-material.controller';

describe('LevelUpMaterialController', () => {
  let controller: LevelUpMaterialController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LevelUpMaterialController],
    }).compile();

    controller = module.get<LevelUpMaterialController>(
      LevelUpMaterialController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
