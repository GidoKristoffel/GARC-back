import { EMaterialRarity } from '../../../../core/enums/material-rarity.enum';
import { $Enums } from '.prisma/client';
import { EAscensionMaterialType } from '../../../../core/enums/ascension-material-type.enum';

export interface IAscensionMaterial {
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
  type: EAscensionMaterialType;
  rarity: EMaterialRarity;
  icon: string;
}

export interface IAscensionMaterialCreate {
  nameEn: string;
  nameUa: string;
  nameRu: string;
  descriptionEn: string;
  descriptionUa: string;
  descriptionRu: string;
  type: $Enums.AscensionMaterialType;
  rarity: $Enums.MaterialRarity;
  icon: string;
}

export interface IDeletedAscensionMaterial {
  id: string;
}
