import { IsString } from 'class-validator';
import { EQuality } from '../../../../core/enums/quality.enum';
import { EElement } from '../../../../core/enums/element.enum';
import { ERegion } from '../../../../core/enums/region.enum';
import { ECharacterBonusAttribute } from '../../../../core/enums/character-bonus-attribute.enum';
import { EArche } from '../../../../core/enums/arche.enum';
import { EWeaponType } from '../../../../core/enums/weapon-type.enum';

export class CharacterDto {
  name: {
    en: string;
    ua: string;
    ru: string;
  };
  quality: EQuality;
  elementalType: EElement;
  region: ERegion;
  bonusAttribute: ECharacterBonusAttribute;
  weapon: EWeaponType;
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
