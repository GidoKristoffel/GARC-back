import { $Enums } from '.prisma/client';
import { EQuality } from '../../../../core/enums/quality.enum';
import { ERegion } from '../../../../core/enums/region.enum';
import { ECharacterBonusAttribute } from '../../../../core/enums/character-bonus-attribute.enum';
import { EArche } from '../../../../core/enums/arche.enum';
import { EElement } from '../../../../core/enums/element.enum';
import { EWeaponType } from '../../../../core/enums/weapon-type.enum';

export interface IDeletedCharacter {
  id: string;
}

export interface ICharacterCreate {
  nameEn: string;
  nameUa: string;
  nameRu: string;
  quality: $Enums.Quality;
  elementalType: $Enums.Element;
  region: $Enums.Region;
  bonusAttribute: $Enums.BonusAttribute;
  weapon: $Enums.WeaponType;
  constellationEn: string;
  constellationUa: string;
  constellationRu: string;
  arche: $Enums.Arche[];
  birthday: Date;
  titleEn: string;
  titleUa: string;
  titleRu: string;
  affiliationEn: string;
  affiliationUa: string;
  affiliationRu: string;
  icon: string;
  splashArt: string;
  cardIcon: string;
}

export interface ICharacter {
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
}

export interface IAutocompleteCharacter {
  nameEn: string;
  nameUa: string;
  nameRu: string;
  quality: EQuality;
  elementalType: EElement;
  region: ERegion;
  bonusAttribute: ECharacterBonusAttribute;
  weapon: EWeaponType;
  constellationEn: string;
  constellationUa: string;
  constellationRu: string;
  arche: EArche[];
  birthday: Date;
  titleEn: string;
  titleUa: string;
  titleRu: string;
  affiliationEn: string;
  affiliationUa: string;
  affiliationRu: string;
  icon: string;
  splashArt: string;
  cardIcon: string;
}
