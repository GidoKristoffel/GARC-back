import { EMobType } from '../enums/mob-type.enum';

export class MobDto {
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
  type: EMobType;
  icon: string;
}
