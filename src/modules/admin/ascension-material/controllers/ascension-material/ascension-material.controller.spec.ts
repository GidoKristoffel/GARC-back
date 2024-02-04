import { Test, TestingModule } from '@nestjs/testing';
import { AscensionMaterialController } from './ascension-material.controller';

describe('AscensionMaterialController', () => {
  let controller: AscensionMaterialController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AscensionMaterialController],
    }).compile();

    controller = module.get<AscensionMaterialController>(AscensionMaterialController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
