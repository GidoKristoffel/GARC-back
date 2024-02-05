import { Injectable } from '@nestjs/common';
import { Character, UserCharacters } from '@prisma/client';
import {
  ICharacter,
  IDeletedCharacter,
} from '../../interfaces/common.interface';
import { CharacterDto } from '../../dto';
import { AvailableCharactersDto } from '../../dto/available-characters.dto';
import { TransformCharacterService } from '../transform-character/transform-character.service';
import { PrismaService } from '../../../../shared/prisma/prisma.service';

@Injectable()
export class CharacterService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly transformCharacterService: TransformCharacterService,
  ) {}

  public async findOne(id: string): Promise<ICharacter | null> {
    return this.prismaService.character
      .findFirst({
        where: {
          id,
        },
      })
      .then((character) =>
        this.transformCharacterService.transformToResponseFormat(character),
      )
      .catch(() => null);
  }

  public async findAll(): Promise<Character[] | null> {
    return this.prismaService.character
      .findMany()
      .then((characters) => {
        return characters.map((character) =>
          this.transformCharacterService.transformToResponseFormat(character),
        );
      })
      .catch(() => null);
  }

  public async create(character: CharacterDto): Promise<ICharacter | null> {
    const createdCharacter: Character =
      await this.prismaService.character.create({
        data: this.transformCharacterService.transformToDBFormat(character),
      });
    return this.transformCharacterService.transformToResponseFormat(
      createdCharacter,
    );
  }

  public async update(
    id: string,
    character: CharacterDto,
  ): Promise<ICharacter | null> {
    const updatedCharacter: Character | null =
      await this.prismaService.character.update({
        where: {
          id,
        },
        data: this.transformCharacterService.transformToDBFormat(character),
      });

    if (!updatedCharacter) {
      return null;
    }

    return this.transformCharacterService.transformToResponseFormat(
      updatedCharacter,
    );
  }

  public async updateAvailableCharacters(
    userId: string,
    available: AvailableCharactersDto,
  ): Promise<UserCharacters[]> {
    const add: { userId: string; characterId: string }[] = available.add.map(
      (characterId: string): { userId: string; characterId: string } => {
        return {
          userId,
          characterId,
        };
      },
    );
    this.prismaService.userCharacters.createMany({
      data: add,
    });

    available.remove.forEach((characterId: string): void => {
      this.prismaService.userCharacters.delete({
        where: {
          userId_characterId: {
            userId,
            characterId,
          },
        },
      });
    });

    return this.prismaService.userCharacters.findMany({
      where: {
        userId,
      },
    });
  }

  public async delete(id: string): Promise<IDeletedCharacter> {
    return this.prismaService.character.delete({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });
  }
}
