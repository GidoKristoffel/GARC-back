import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../shared/prisma/prisma.service';
import { AscensionMaterial, Prisma, PrismaPromise } from '@prisma/client';
import {
  IAvailableCharacter,
  IAvailableCharacterCreate,
} from '../../interfaces/common.interface';

@Injectable()
export class AvailableCharactersService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getByUserId(
    userId: string,
  ): Promise<IAvailableCharacter[] | null> {
    return this.prismaService.userCharacters
      .findMany({
        where: {
          userId,
        },
      })
      .catch(() => null);
  }

  public add(
    userId: string,
    characterIds: string[],
  ): Promise<Prisma.BatchPayload> {
    return this.prismaService.userCharacters.createMany({
      data: characterIds.map((characterId: string): IAvailableCharacter => {
        return {
          userId,
          characterId,
        };
      }),
      skipDuplicates: true,
    });
  }

  public async remove(
    userId: string,
    characterIds: string[],
  ): Promise<Prisma.BatchPayload> {
    return this.prismaService.userCharacters.deleteMany({
      where: {
        userId: userId,
        characterId: { in: characterIds },
      },
    });
  }
}
