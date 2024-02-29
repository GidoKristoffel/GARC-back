import { Injectable } from '@nestjs/common';
import { Character } from '@prisma/client';
import { EElement } from '../../../../../core/enums/element.enum';
import { ERegion } from '../../../../../core/enums/region.enum';
import { ECharacterBonusAttribute } from '../../../../../core/enums/character-bonus-attribute.enum';
import { $Enums, UserCharacters } from '.prisma/client';
import { EArche } from '../../../../../core/enums/arche.enum';
import { EQuality } from '../../../../../core/enums/quality.enum';
import { EWeaponType } from '../../../../../core/enums/weapon-type.enum';
import { IFullAvailableCharacter } from '../../interfaces/common.interface';

@Injectable()
export class TransformAvailableCharactersService {
  public transformToResponseFormat(
    character: Character | null,
    availableCharacters: UserCharacters[],
  ): IFullAvailableCharacter | null {
    if (!character) {
      return null;
    }
    return {
      id: character.id,
      name: {
        en: character.nameEn,
        ua: character.nameUa,
        ru: character.nameRu,
      },
      quality: this.convertToKebabCase(character.quality) as EQuality,
      elementalType: this.convertToKebabCase(
        character.elementalType,
      ) as EElement,
      region: this.convertToKebabCase(character.region) as ERegion,
      bonusAttribute: this.convertToKebabCase(
        character.bonusAttribute,
      ) as ECharacterBonusAttribute,
      weapon: this.convertToKebabCase(character.weapon) as EWeaponType,
      constellation: {
        en: character.constellationEn,
        ua: character.constellationUa,
        ru: character.constellationRu,
      },
      arche: character.arche.map((a: $Enums.Arche) =>
        a.toLowerCase(),
      ) as EArche[],
      birthday: character.birthday,
      title: {
        en: character.titleEn,
        ua: character.titleUa,
        ru: character.titleRu,
      },
      affiliation: {
        en: character.affiliationEn,
        ua: character.affiliationUa,
        ru: character.affiliationRu,
      },
      icon: character.icon,
      splashArt: character.splashArt,
      cardIcon: character.cardIcon,
      available: this.checkAvailable(character.id, availableCharacters),
    };
  }

  private convertToKebabCase(input: string): string {
    return input.toLowerCase().replace(/_/g, '-');
  }

  private checkAvailable(
    characterId: string,
    availableCharacters: UserCharacters[],
  ): boolean {
    return availableCharacters
      .map(
        (availableCharacter: UserCharacters) => availableCharacter.characterId,
      )
      .includes(characterId);
  }
}
