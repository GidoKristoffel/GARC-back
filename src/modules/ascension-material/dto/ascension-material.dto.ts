import { ETalentMaterialType } from '../../../core/enums/talent-material-type.enum';
import { EMaterialRarity } from '../../../core/enums/material-rarity.enum';

export class AscensionMaterialDto {
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
  icon: string;
}
