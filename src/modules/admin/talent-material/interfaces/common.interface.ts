import { $Enums } from '.prisma/client';
import { ETalentMaterialType } from '../../../../core/enums/talent-material-type.enum';
import { EMaterialRarity } from '../../../../core/enums/material-rarity.enum';
import { ERegion } from '../../../../core/enums/region.enum';
import { EDay } from '../../../../core/enums/day.enum';

export interface ITalentMaterial {
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
  type: ETalentMaterialType;
  rarity: EMaterialRarity;
  region: ERegion;
  farmDays: EDay[];
  icon: string;
}

export interface ITalentMaterialCreate {
  nameEn: string;
  nameUa: string;
  nameRu: string;
  descriptionEn: string;
  descriptionUa: string;
  descriptionRu: string;
  type: $Enums.TalentMaterialType;
  rarity: $Enums.MaterialRarity;
  region: $Enums.Region;
  farmDays: $Enums.Day[];
  icon: string;
}

export interface IDeletedTalentMaterial {
  id: string;
}
