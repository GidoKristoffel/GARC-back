import { EMaterialRarity } from '../../../core/enums/material-rarity.enum';
import { ERegion } from '../../character/enums/region.enum';
import { EDay } from '../../../core/enums/day.enum';
import { $Enums } from '.prisma/client';
import { EWeaponMaterialType } from '../../../core/enums/weapon-material-type.enum';

export interface IWeaponMaterial {
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
  type: EWeaponMaterialType;
  rarity: EMaterialRarity;
  region: ERegion;
  farmDays: EDay[];
  icon: string;
}

export interface IWeaponMaterialCreate {
  nameEn: string;
  nameUa: string;
  nameRu: string;
  descriptionEn: string;
  descriptionUa: string;
  descriptionRu: string;
  type: $Enums.WeaponMaterialType;
  rarity: $Enums.MaterialRarity;
  region: $Enums.Region;
  farmDays: $Enums.Day[];
  icon: string;
}

export interface IDeletedWeaponMaterial {
  id: string;
}
