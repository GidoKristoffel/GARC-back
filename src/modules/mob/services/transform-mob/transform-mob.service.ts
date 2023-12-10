import { Injectable } from '@nestjs/common';
import { Mob } from '@prisma/client';
import { IMob } from '../../interfaces/common.interface';

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
      type: data.type,
    };
  }
}
