import { Injectable } from '@nestjs/common';
import { EMaterialRarity } from '../../../../../core/enums/material-rarity.enum';
import { $Enums } from '.prisma/client';
import { EAscensionMaterialType } from '../../../../../core/enums/ascension-material-type.enum';
import { AscensionMaterial } from '@prisma/client';
import {
  IAscensionMaterial,
  IAscensionMaterialCreate,
} from '../../interfaces/common.interface';
import { AscensionMaterialDto } from '../../dto';

@Injectable()
export class TransformAscensionMaterialService {
  public transformToResponseFormat(
    data: AscensionMaterial,
  ): IAscensionMaterial | null {
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
      type: this.convertToKebabCase(data.type) as EAscensionMaterialType,
      rarity: this.convertToKebabCase(data.rarity) as EMaterialRarity,
      icon: data.icon,
    };
  }

  public transformToDBFormat(
    ascensionMaterial: AscensionMaterialDto,
  ): IAscensionMaterialCreate {
    return {
      nameEn: ascensionMaterial.name.en,
      nameUa: ascensionMaterial.name.ua,
      nameRu: ascensionMaterial.name.ru,
      descriptionEn: ascensionMaterial.description.en,
      descriptionUa: ascensionMaterial.description.ua,
      descriptionRu: ascensionMaterial.description.ru,
      type: ascensionMaterial.type.toUpperCase() as $Enums.AscensionMaterialType,
      rarity: ascensionMaterial.rarity.toUpperCase() as $Enums.MaterialRarity,
      icon: ascensionMaterial.icon,
    };
  }

  private convertToKebabCase(input: string): string {
    return input.toLowerCase().replace(/_/g, '-');
  }
}
