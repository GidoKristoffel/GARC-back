import { Test, TestingModule } from '@nestjs/testing';
import { TransformWeeklyBossService } from './transform-weekly-boss.service';

describe('TransformWeeklyBossService', () => {
  let service: TransformWeeklyBossService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransformWeeklyBossService],
    }).compile();

    service = module.get<TransformWeeklyBossService>(TransformWeeklyBossService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
