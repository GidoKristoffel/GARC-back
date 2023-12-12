import { EEnemyType } from '../../../core/enums/emeny-type.enum';

export class EliteBossDto {
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
