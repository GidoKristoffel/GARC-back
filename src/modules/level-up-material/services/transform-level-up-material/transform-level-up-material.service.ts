import { Injectable } from '@nestjs/common';
import { EMaterialRarity } from '../../../../core/enums/material-rarity.enum';
import { $Enums } from '.prisma/client';
import { LevelUpMaterial } from '@prisma/client';
import {
  ILevelUpMaterial,
  ILevelUpMaterialCreate,
} from '../../interfaces/common.interface';
import { ELevelUpMaterialType } from '../../../../core/enums/level-up-material-type.enum';
import { LevelUpMaterialDto } from '../../dto';

@Injectable()
export class TransformLevelUpMaterialService {
  public transformToResponseFormat(
    data: LevelUpMaterial,
  ): ILevelUpMaterial | null {
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
      type: this.convertToKebabCase(data.type) as ELevelUpMaterialType,
      rarity: this.convertToKebabCase(data.rarity) as EMaterialRarity,
      icon: data.icon,
    };
  }

  public transformToDBFormat(
    levelUpMaterial: LevelUpMaterialDto,
  ): ILevelUpMaterialCreate {
    return {
      nameEn: levelUpMaterial.name.en,
      nameUa: levelUpMaterial.name.ua,
      nameRu: levelUpMaterial.name.ru,
      descriptionEn: levelUpMaterial.description.en,
      descriptionUa: levelUpMaterial.description.ua,
      descriptionRu: levelUpMaterial.description.ru,
      type: levelUpMaterial.type.toUpperCase() as $Enums.LevelUpMaterialType,
      rarity: levelUpMaterial.rarity.toUpperCase() as $Enums.MaterialRarity,
      icon: levelUpMaterial.icon,
    };
  }

  private convertToKebabCase(input: string): string {
    return input.toLowerCase().replace(/_/g, '-');
  }
}
