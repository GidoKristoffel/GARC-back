import { Test, TestingModule } from '@nestjs/testing';
import { TalentMaterialController } from './talent-material.controller';

describe('TalentMaterialController', () => {
  let controller: TalentMaterialController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TalentMaterialController],
    }).compile();

    controller = module.get<TalentMaterialController>(TalentMaterialController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
