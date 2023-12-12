import { $Enums } from '.prisma/client';
import { EEnemyType } from '../../../core/enums/emeny-type.enum';

export interface IEliteBoss {
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
  type: EEnemyType;
  icon: string;
}

export interface IEliteBossCreate {
  nameEn: string;
  nameUa: string;
  nameRu: string;
  descriptionEn: string;
  descriptionUa: string;
  descriptionRu: string;
  type: $Enums.EnemyType;
  icon: string;
}

export interface IDeletedEliteBoss {
  id: string;
}
