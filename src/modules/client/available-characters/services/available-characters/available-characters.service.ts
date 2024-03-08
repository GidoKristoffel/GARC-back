import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../shared/prisma/prisma.service';
import { Character, Prisma } from '@prisma/client';
import {
  IAvailableCharacter,
  IFullAvailableCharacter,
} from '../../interfaces/common.interface';
import { TransformAvailableCharactersService } from '../transform-available-characters/transform-available-characters.service';
import { UserCharacters } from '.prisma/client';

@Injectable()
export class AvailableCharactersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly transformAvailableCharacters: TransformAvailableCharactersService,
  ) {}

  public async getByUserId(
    userId: string,
  ): Promise<IFullAvailableCharacter[] | null> {
    return this.prismaService.character
      .findMany()
      .then((characters: Character[]) => {
        return this.prismaService.userCharacters
          .findMany({
            where: {
              userId,
            },
          })
          .then(
            (
              availableCharacters: UserCharacters[],
            ): IFullAvailableCharacter[] => {
              return characters.map((character: Character) =>
                this.transformAvailableCharacters.transformToResponseFormat(
                  character,
                  availableCharacters,
                ),
              );
            },
          )
          .catch(() => null);
      })
      .catch(() => []);
  }

  public async update(
    userId: string,
    charactersToAdd: string[],
    charactersToRemove: string[],
  ): Promise<IFullAvailableCharacter[]> {
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

    return (await this.getByUserId(userId)) ?? null;
  }
}
