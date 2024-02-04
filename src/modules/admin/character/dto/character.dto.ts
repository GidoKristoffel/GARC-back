import { IsString } from 'class-validator';
import { EQuality } from '../enums/quality.enum';
import { EElement } from '../enums/element.enum';
import { ERegion } from '../enums/region.enum';
import { EBonusAttribute } from '../enums/bonus-attribute.enum';
import { EWeapon } from '../enums/weapon.enum';
import { EArche } from '../enums/arche.enum';

export class CharacterDto {
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
  @IsString()
  icon: string;
  @IsString()
  splashArt: string;
  @IsString()
  cardIcon: string;
}
