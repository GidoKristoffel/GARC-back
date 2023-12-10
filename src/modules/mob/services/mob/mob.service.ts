import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { IDeletedMob, IMob } from '../../interfaces/common.interface';
import { TransformMobService } from '../transform-mob/transform-mob.service';
import { Character, Mob } from '@prisma/client';
import { MobDto } from '../../dto';

@Injectable()
export class MobService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly transformMobService: TransformMobService,
  ) {}

  public async findOne(id: string): Promise<IMob | null> {
    return this.prismaService.mob
      .findFirst({
        where: {
          id,
        },
      })
      .then((mob: Mob) =>
        this.transformMobService.transformToResponseFormat(mob),
      )
      .catch(() => null);
  }

  public async findAll(): Promise<Character[] | null> {
    return this.prismaService.mob
      .findMany()
      .then((mobs: Mob[]) => {
        return mobs.map((mob: Mob) =>
          this.transformMobService.transformToResponseFormat(mob),
        );
      })
      .catch(() => null);
  }

  public async create(mob: MobDto): Promise<IMob | null> {
    const createdMob: Mob = await this.prismaService.mob.create({
      data: this.transformMobService.transformToDBFormat(mob),
    });
    return this.transformMobService.transformToResponseFormat(createdMob);
  }

  public async update(id: string, mob: MobDto): Promise<IMob | null> {
    const updatedMob: Mob | null = await this.prismaService.mob.update({
      where: {
        id,
      },
      data: this.transformMobService.transformToDBFormat(mob),
    });

    if (!updatedMob) {
      return null;
    }

    return this.transformMobService.transformToResponseFormat(updatedMob);
  }

  public async delete(id: string): Promise<IDeletedMob> {
    return this.prismaService.mob.delete({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });
  }
}
