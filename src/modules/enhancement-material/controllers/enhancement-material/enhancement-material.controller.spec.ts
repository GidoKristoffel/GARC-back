import { Test, TestingModule } from '@nestjs/testing';
import { EnhancementMaterialController } from './enhancement-material.controller';

describe('EnhancementMaterialController', () => {
  let controller: EnhancementMaterialController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnhancementMaterialController],
    }).compile();

    controller = module.get<EnhancementMaterialController>(EnhancementMaterialController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
