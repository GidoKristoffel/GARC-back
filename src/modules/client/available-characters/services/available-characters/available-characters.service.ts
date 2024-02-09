import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../shared/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { IAvailableCharacter } from '../../interfaces/common.interface';

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

  public async update(
    userId: string,
    charactersToAdd: string[],
    charactersToRemove: string[],
  ): Promise<void> {
    const operations: Promise<Prisma.BatchPayload>[] = [];

    if (charactersToAdd.length > 0) {
      operations.push(
        this.prismaService.userCharacters.createMany({
          data: charactersToAdd.map(
            (characterId: string): IAvailableCharacter => ({
              userId,
              characterId,
            }),
          ),
        }),
      );
    }

    if (charactersToRemove.length > 0) {
      operations.push(
        this.prismaService.userCharacters.deleteMany({
          where: {
            userId,
            characterId: { in: charactersToRemove },
          },
        }),
      );
    }

    await Promise.all(operations);
  }

  // public add(
  //   userId: string,
  //   characterIds: string[],
  // ): Promise<Prisma.BatchPayload> {
  //   return this.prismaService.userCharacters.createMany({
  //     data: characterIds.map((characterId: string): IAvailableCharacter => {
  //       return {
  //         userId,
  //         characterId,
  //       };
  //     }),
  //     skipDuplicates: true,
  //   });
  // }
  //
  // public async remove(
  //   userId: string,
  //   characterIds: string[],
  // ): Promise<Prisma.BatchPayload> {
  //   return this.prismaService.userCharacters.deleteMany({
  //     where: {
  //       userId: userId,
  //       characterId: { in: characterIds },
  //     },
  //   });
  // }
}
