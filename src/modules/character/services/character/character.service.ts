import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { Character } from '@prisma/client';
import { IDeletedCharacter } from '../../interfaces/common.interface';
import { CharacterDto } from '../../dto';

@Injectable()
export class CharacterService {
  constructor(private readonly prismaService: PrismaService) {}

  public async findOne(id: string): Promise<Character | null> {
    return this.prismaService.character.findFirst({
      where: {
        id,
      },
    });
  }

  public async findAll(): Promise<Character[] | null> {
    return this.prismaService.character.findMany();
  }

  public async create(character: CharacterDto): Promise<Character | null> {
    return this.prismaService.character.create({
      data: {
        nameEn: character.name.en,
        nameUa: character.name.ua,
        nameRu: character.name.ru,
        quality: character.quality,
        elementalType: character.elementalType,
        region: character.region,
        bonusAttribute: character.bonusAttribute,
        weapon: character.weapon,
        constellationEn: character.constellation.en,
        constellationUa: character.constellation.ua,
        constellationRu: character.constellation.ru,
        arche: character.arche,
        birthday: character.birthday,
        titleEn: character.title.en,
        titleUa: character.title.ua,
        titleRu: character.title.ru,
        affiliationEn: character.affiliation.en,
        affiliationUa: character.affiliation.ua,
        affiliationRu: character.affiliation.ru,
        icon: character.icon,
        splashArt: character.splashArt,
        cardIcon: character.cardIcon,
      },
    });
  }

  public async update(
    id: string,
    character: CharacterDto,
  ): Promise<Character | null> {
    return this.prismaService.character.update({
      where: {
        id,
      },
      data: {
        nameEn: character.name.en,
        nameUa: character.name.ua,
        nameRu: character.name.ru,
        quality: character.quality,
        elementalType: character.elementalType,
        region: character.region,
        bonusAttribute: character.bonusAttribute,
        weapon: character.weapon,
        constellationEn: character.constellation.en,
        constellationUa: character.constellation.ua,
        constellationRu: character.constellation.ru,
        arche: character.arche,
        birthday: character.birthday,
        titleEn: character.title.en,
        titleUa: character.title.ua,
        titleRu: character.title.ru,
        affiliationEn: character.affiliation.en,
        affiliationUa: character.affiliation.ua,
        affiliationRu: character.affiliation.ru,
        icon: character.icon,
        splashArt: character.splashArt,
        cardIcon: character.cardIcon,
      },
    });
  }

  public async delete(id: string): Promise<IDeletedCharacter> {
    return this.prismaService.user.delete({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });
  }
}
