import { EEnemyType } from '../../../core/enums/emeny-type.enum';
import { $Enums } from '.prisma/client';

export interface IWeeklyBoss {
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

export interface IWeeklyBossCreate {
  nameEn: string;
  nameUa: string;
  nameRu: string;
  descriptionEn: string;
  descriptionUa: string;
  descriptionRu: string;
  type: $Enums.EnemyType;
  icon: string;
}

export interface IDeletedWeeklyBoss {
  id: string;
}
