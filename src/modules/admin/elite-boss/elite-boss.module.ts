import { Module } from '@nestjs/common';
import { EliteBossController } from './controllers/elite-boss/elite-boss.controller';
import { EliteBossService } from './services/elite-boss/elite-boss.service';
import { TransformEliteBossService } from './services/transform-elite-boss/transform-elite-boss.service';

@Module({
  controllers: [EliteBossController],
  providers: [EliteBossService, TransformEliteBossService],
})
export class EliteBossModule {}
