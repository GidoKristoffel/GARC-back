import { Injectable } from '@nestjs/common';
import { WeeklyBoss } from '@prisma/client';
import { TransformWeeklyBossService } from '../transform-weekly-boss/transform-weekly-boss/transform-weekly-boss.service';
import {
  IDeletedWeeklyBoss,
  IWeeklyBoss,
} from '../../interfaces/common.interface';
import { WeeklyBossDto } from '../../dto';
import { PrismaService } from '../../../../shared/prisma/prisma.service';

@Injectable()
export class WeeklyBossService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly transformWeeklyBossService: TransformWeeklyBossService,
  ) {}

  public async findOne(id: string): Promise<IWeeklyBoss | null> {
    return this.prismaService.weeklyBoss
      .findFirst({
        where: {
          id,
        },
      })
      .then((weeklyBoss: WeeklyBoss) =>
        this.transformWeeklyBossService.transformToResponseFormat(weeklyBoss),
      )
      .catch(() => null);
  }

  public async findAll(): Promise<IWeeklyBoss[] | null> {
    return this.prismaService.weeklyBoss
      .findMany()
      .then((weeklyBosses: WeeklyBoss[]) => {
        return weeklyBosses.map((weeklyBoss: WeeklyBoss) =>
          this.transformWeeklyBossService.transformToResponseFormat(weeklyBoss),
        );
      })
      .catch(() => null);
  }

  public async create(weeklyBoss: WeeklyBossDto): Promise<IWeeklyBoss | null> {
    const createdWeeklyBoss: WeeklyBoss =
      await this.prismaService.weeklyBoss.create({
        data: this.transformWeeklyBossService.transformToDBFormat(weeklyBoss),
      });
    return this.transformWeeklyBossService.transformToResponseFormat(
      createdWeeklyBoss,
    );
  }

  public async update(
    id: string,
    weeklyBoss: WeeklyBossDto,
  ): Promise<IWeeklyBoss | null> {
    const updatedWeeklyBoss: WeeklyBoss | null =
      await this.prismaService.weeklyBoss.update({
        where: {
          id,
        },
        data: this.transformWeeklyBossService.transformToDBFormat(weeklyBoss),
      });

    if (!updatedWeeklyBoss) {
      return null;
    }

    return this.transformWeeklyBossService.transformToResponseFormat(
      updatedWeeklyBoss,
    );
  }

  public async delete(id: string): Promise<IDeletedWeeklyBoss> {
    return this.prismaService.weeklyBoss.delete({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });
  }
}
