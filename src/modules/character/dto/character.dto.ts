import {
  Arche,
  BonusAttribute,
  Element,
  Quality,
  Region,
  Weapon,
} from '@prisma/client';
import { IsString } from 'class-validator';

export class CharacterDto {
  name: {
    en: string;
    ua: string;
    ru: string;
  };
  quality: Quality;
  elementalType: Element;
  region: Region;
  bonusAttribute: BonusAttribute;
  weapon: Weapon;
  constellation: {
    en: string;
    ua: string;
    ru: string;
  };
  arche: Arche[];
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
