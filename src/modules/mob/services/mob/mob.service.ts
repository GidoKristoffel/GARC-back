import { Injectable } from '@nestjs/common';
import { ICharacter } from '../../../character/interfaces/common.interface';
import { PrismaService } from '../../../prisma/prisma.service';
import { TransformCharacterService } from '../../../character/services/transform-character/transform-character.service';
import { IMob } from '../../interfaces/common.interface';
import { TransformMobService } from '../transform-mob/transform-mob.service';
import { Mob } from '@prisma/client';

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
}
