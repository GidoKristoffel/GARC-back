import { Injectable } from '@nestjs/common';
import { $Enums } from '.prisma/client';
import { WeeklyBoss } from '@prisma/client';
import {
  IWeeklyBoss,
  IWeeklyBossCreate,
} from '../../../interfaces/common.interface';
import { WeeklyBossDto } from '../../../dto';
import { EEnemyType } from '../../../../../../core/enums/emeny-type.enum';

@Injectable()
export class TransformWeeklyBossService {
  public transformToResponseFormat(data: WeeklyBoss): IWeeklyBoss | null {
    if (!data) {
      return null;
    }
    return {
      id: data.id,
      name: {
        en: data.nameEn,
        ua: data.nameUa,
        ru: data.nameRu,
      },
      description: {
        en: data.descriptionEn,
        ua: data.descriptionUa,
        ru: data.descriptionRu,
      },
      type: this.convertToKebabCase(data.type) as EEnemyType,
      icon: data.icon,
    };
  }

  public transformToDBFormat(mob: WeeklyBossDto): IWeeklyBossCreate {
    return {
      nameEn: mob.name.en,
      nameUa: mob.name.ua,
      nameRu: mob.name.ru,
      descriptionEn: mob.description.en,
      descriptionUa: mob.description.ua,
      descriptionRu: mob.description.ru,
      type: mob.type.toUpperCase() as $Enums.EnemyType,
      icon: mob.icon,
    };
  }

  private convertToKebabCase(input: string): string {
    return input.toLowerCase().replace(/_/g, '-');
  }
}
