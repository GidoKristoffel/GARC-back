import { $Enums } from '.prisma/client';
import { EWeaponType } from '../../../core/enums/weapon-type.enum';
import { EWeaponBonusAttribute } from '../../../core/enums/weapon-bonus-attribute.enum';
import { EWeaponQuality } from '../../../core/enums/weapon-quality.enum';
import { ERegion } from '../../character/enums/region.enum';

export interface IDeletedWeapon {
  id: string;
}

export interface IWeaponCreate {
  nameEn: string;
  nameUa: string;
  nameRu: string;
  descriptionEn: string;
  descriptionUa: string;
  descriptionRu: string;
  abilityDescriptionEn: string;
  abilityDescriptionUa: string;
  abilityDescriptionRu: string;
  type: $Enums.WeaponType;
  bonusAttribute: $Enums.WeaponBonusAttribute;
  quality: $Enums.WeaponQuality;
  region: $Enums.Region;
}

export interface IWeapon {
  id: string;
  name: {
    en: string;
    ua: string;
    ru: string;
  };
  description: {
    en: string;
    ua: string;
    ru: string;
  };
  abilityDescription: {
    en: string;
    ua: string;
    ru: string;
  };
  type: EWeaponType;
  bonusAttribute: EWeaponBonusAttribute;
  quality: EWeaponQuality;
  region: ERegion;
}
