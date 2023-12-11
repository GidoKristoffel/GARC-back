import { $Enums } from '.prisma/client';

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
  type: $Enums.MobType;
  icon: string;
}

export interface IMobCreate {
  nameEn: string;
  nameUa: string;
  nameRu: string;
  descriptionEn: string;
  descriptionUa: string;
  descriptionRu: string;
  type: $Enums.MobType;
  icon: string;
}

export interface IDeletedMob {
  id: string;
}
