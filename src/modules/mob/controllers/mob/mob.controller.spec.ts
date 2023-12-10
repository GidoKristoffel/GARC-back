import { Test, TestingModule } from '@nestjs/testing';
import { MobController } from './mob.controller';

describe('MobController', () => {
  let controller: MobController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MobController],
    }).compile();

    controller = module.get<MobController>(MobController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
