import { Injectable } from '@nestjs/common';
import { EliteBoss } from '@prisma/client';
import { $Enums } from '.prisma/client';
import {
  IEliteBoss,
  IEliteBossCreate,
} from '../../interfaces/common.interface';
import { EEnemyType } from '../../../../core/enums/emeny-type.enum';
import { EliteBossDto } from '../../dto';

@Injectable()
export class TransformEliteBossService {
  public transformToResponseFormat(data: EliteBoss): IEliteBoss | null {
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

  public transformToDBFormat(mob: EliteBossDto): IEliteBossCreate {
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
