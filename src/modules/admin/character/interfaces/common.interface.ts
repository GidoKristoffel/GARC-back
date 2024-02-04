import { $Enums } from '.prisma/client';
import { EQuality } from '../enums/quality.enum';
import { ERegion } from '../enums/region.enum';
import { EBonusAttribute } from '../enums/bonus-attribute.enum';
import { EWeapon } from '../enums/weapon.enum';
import { EArche } from '../enums/arche.enum';
import { EElement } from '../enums/element.enum';

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
  bonusAttribute: EBonusAttribute;
  weapon: EWeapon;
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
