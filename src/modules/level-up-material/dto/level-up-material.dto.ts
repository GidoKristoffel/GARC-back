import { EMaterialRarity } from '../../../core/enums/material-rarity.enum';
import { ELevelUpMaterialType } from '../../../core/enums/level-up-material-type.enum';

export class LevelUpMaterialDto {
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
