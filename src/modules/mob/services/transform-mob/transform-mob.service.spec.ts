import { Test, TestingModule } from '@nestjs/testing';
import { TransformMobService } from './transform-mob.service';

describe('TransformMobService', () => {
  let service: TransformMobService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransformMobService],
    }).compile();

    service = module.get<TransformMobService>(TransformMobService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
