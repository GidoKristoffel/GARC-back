import { EQuality } from '../../../../core/enums/quality.enum';
import { EElement } from '../../../../core/enums/element.enum';
import { ERegion } from '../../../../core/enums/region.enum';
import { ECharacterBonusAttribute } from '../../../../core/enums/character-bonus-attribute.enum';
import { EWeaponType } from '../../../../core/enums/weapon-type.enum';
import { EArche } from '../../../../core/enums/arche.enum';
import { HttpStatus } from "@nestjs/common";

export interface IAvailableCharacter {
  userId: string;
  characterId: string;
}

export interface IAvailableCharacterCreate {
  userId: string;
  characterId: string;
}

export interface IDeletedAvailableCharacters {
  ids: string[];
}

export interface IFullAvailableCharacterResponse {
  availableCharacters: IFullAvailableCharacter[];
  status: HttpStatus.FOUND | HttpStatus.NOT_FOUND;
}

export interface IFullAvailableCharacter {
  id: string;
  name: {
    en: string;
    ua: string;
    ru: string;
  };
  quality: EQuality;
  elementalType: EElement;
  region: ERegion;
  bonusAttribute: ECharacterBonusAttribute;
  weapon: EWeaponType;
  constellation: {
    en: string;
    ua: string;
    ru: string;
  };
  arche: EArche[];
  birthday: Date;
  title: {
    en: string;
    ua: string;
    ru: string;
  };
  affiliation: {
    en: string;
    ua: string;
    ru: string;
  };
  icon: string;
  splashArt: string;
  cardIcon: string;
  available: boolean;
}
