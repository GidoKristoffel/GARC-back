import { EMaterialRarity } from '../../../core/enums/material-rarity.enum';
import { $Enums } from '.prisma/client';
import { ELevelUpMaterialType } from '../../../core/enums/level-up-material-type.enum';

export interface ILevelUpMaterial {
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
  type: ELevelUpMaterialType;
  rarity: EMaterialRarity;
  icon: string;
}

export interface ILevelUpMaterialCreate {
  nameEn: string;
  nameUa: string;
  nameRu: string;
  descriptionEn: string;
  descriptionUa: string;
  descriptionRu: string;
  type: $Enums.LevelUpMaterialType;
  rarity: $Enums.MaterialRarity;
  icon: string;
}

export interface IDeletedLevelUpMaterial {
  id: string;
}
