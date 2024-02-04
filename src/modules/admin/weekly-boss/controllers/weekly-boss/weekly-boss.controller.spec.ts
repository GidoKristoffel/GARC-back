import { Test, TestingModule } from '@nestjs/testing';
import { WeeklyBossController } from './weekly-boss.controller';

describe('WeeklyBossController', () => {
  let controller: WeeklyBossController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeeklyBossController],
    }).compile();

    controller = module.get<WeeklyBossController>(WeeklyBossController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
