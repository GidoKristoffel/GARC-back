import { Injectable } from '@nestjs/common';
import { Mob } from '@prisma/client';
import { IMob, IMobCreate } from '../../interfaces/common.interface';
import { MobDto } from '../../dto';
import { $Enums } from '.prisma/client';
import { EMobType } from '../../enums/mob-type.enum';

@Injectable()
export class TransformMobService {
  public transformToResponseFormat(data: Mob): IMob | null {
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
      type: this.convertToKebabCase(data.type) as EMobType,
      icon: data.icon,
    };
  }

  public transformToDBFormat(mob: MobDto): IMobCreate {
    return {
      nameEn: mob.name.en,
      nameUa: mob.name.ua,
      nameRu: mob.name.ru,
      descriptionEn: mob.description.en,
      descriptionUa: mob.description.ua,
      descriptionRu: mob.description.ru,
      type: mob.type.toUpperCase() as $Enums.MobType,
      icon: mob.icon,
    };
  }

  private convertToKebabCase(input: string): string {
    return input.toLowerCase().replace(/_/g, '-');
  }
}
