import { Test, TestingModule } from '@nestjs/testing';
import { EliteBossService } from './elite-boss.service';

describe('EliteBossService', () => {
  let service: EliteBossService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EliteBossService],
    }).compile();

    service = module.get<EliteBossService>(EliteBossService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
