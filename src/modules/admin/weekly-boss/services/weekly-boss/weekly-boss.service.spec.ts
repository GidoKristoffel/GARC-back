import { Test, TestingModule } from '@nestjs/testing';
import { WeeklyBossService } from './weekly-boss.service';

describe('WeeklyBossService', () => {
  let service: WeeklyBossService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeeklyBossService],
    }).compile();

    service = module.get<WeeklyBossService>(WeeklyBossService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
