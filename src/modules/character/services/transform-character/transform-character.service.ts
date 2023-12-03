import { Injectable } from '@nestjs/common';
import { CharacterDto } from '../../dto';
import {
  ICharacter,
  ICharacterCreate,
} from '../../interfaces/common.interface';
import { $Enums } from '.prisma/client';
import { Character } from '@prisma/client';
import { EArche } from '../../enums/arche.enum';
import { EQuality } from '../../enums/quality.enum';
import { EElement } from '../../enums/element.enum';
import { ERegion } from '../../enums/region.enum';
import { EBonusAttribute } from '../../enums/bonus-attribute.enum';
import { EWeapon } from '../../enums/weapon.enum';

@Injectable()
export class TransformCharacterService {
  public transformToDBFormat(character: CharacterDto): ICharacterCreate {
    return {
      nameEn: character.name.en,
      nameUa: character.name.ua,
      nameRu: character.name.ru,
      quality: character.quality.toUpperCase() as $Enums.Quality,
      elementalType: character.elementalType.toUpperCase() as $Enums.Element,
      region: character.region.toUpperCase() as $Enums.Region,
      bonusAttribute:
        character.bonusAttribute.toUpperCase() as $Enums.BonusAttribute,
      weapon: character.weapon.toUpperCase() as $Enums.Weapon,
      constellationEn: character.constellation.en,
      constellationUa: character.constellation.ua,
      constellationRu: character.constellation.ru,
      arche: character.arche.map((a: EArche) =>
        a.toUpperCase(),
      ) as $Enums.Arche[],
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
    };
  }

  public transformToResponseFormat(data: Character | null): ICharacter | null {
    if (!data) {
      return null;
    }
    return {
      id: data.id,
      name: {
        en: data.nameEn,
        ua: data.nameUa,
        ru: data.nameRu,
      },
      quality: data.quality.toLowerCase() as EQuality,
      elementalType: data.elementalType.toLowerCase() as EElement,
      region: data.region.toLowerCase() as ERegion,
      bonusAttribute: data.bonusAttribute.toLowerCase() as EBonusAttribute,
      weapon: data.weapon.toLowerCase() as EWeapon,
      constellation: {
        en: data.constellationEn,
        ua: data.constellationUa,
        ru: data.constellationRu,
      },
      arche: data.arche.map((a: $Enums.Arche) => a.toLowerCase()) as EArche[],
      birthday: data.birthday,
      title: {
        en: data.titleEn,
        ua: data.titleUa,
        ru: data.titleRu,
      },
      affiliation: {
        en: data.affiliationEn,
        ua: data.affiliationUa,
        ru: data.affiliationRu,
      },
      icon: data.icon,
      splashArt: data.splashArt,
      cardIcon: data.cardIcon,
    };
  }
}
