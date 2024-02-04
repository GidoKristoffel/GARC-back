import { EMaterialRarity } from '../../../../core/enums/material-rarity.enum';
import { EEnhancementMaterialType } from '../../../../core/enums/enhancement-material-type.enum.type';

export class EnhancementMaterialDto {
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
  type: EEnhancementMaterialType;
  rarity: EMaterialRarity;
  icon: string;
}
