import { $Enums } from '.prisma/client';
import { EMobType } from '../enums/mob-type.enum';

export interface IMob {
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
  type: EMobType;
  icon: string;
}

export interface IMobCreate {
  nameEn: string;
  nameUa: string;
  nameRu: string;
  descriptionEn: string;
  descriptionUa: string;
  descriptionRu: string;
  type: $Enums.EnemyType;
  icon: string;
}

export interface IDeletedMob {
  id: string;
}
