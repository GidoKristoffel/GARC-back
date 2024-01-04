import { Injectable } from '@nestjs/common';
import { EnhancementMaterial } from '@prisma/client';
import { EMaterialRarity } from '../../../../core/enums/material-rarity.enum';
import { $Enums } from '.prisma/client';
import { IEnhancementMaterial, IEnhancementMaterialCreate } from "../../interfaces/common.interface";
import { EEnhancementMaterialType } from '../../../../core/enums/enhancement-material-type.enum.type';
import { EnhancementMaterialDto } from "../../dto";

@Injectable()
export class TransformEnhancementMaterialService {
  public transformToResponseFormat(
    data: EnhancementMaterial,
  ): IEnhancementMaterial | null {
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
      type: this.convertToKebabCase(data.type) as EEnhancementMaterialType,
      rarity: this.convertToKebabCase(data.rarity) as EMaterialRarity,
      icon: data.icon,
    };
  }

  public transformToDBFormat(
    enhancementMaterial: EnhancementMaterialDto,
  ): IEnhancementMaterialCreate {
    return {
      nameEn: enhancementMaterial.name.en,
      nameUa: enhancementMaterial.name.ua,
      nameRu: enhancementMaterial.name.ru,
      descriptionEn: enhancementMaterial.description.en,
      descriptionUa: enhancementMaterial.description.ua,
      descriptionRu: enhancementMaterial.description.ru,
      type: enhancementMaterial.type.toUpperCase() as $Enums.EnhancementMaterialType,
      rarity: enhancementMaterial.rarity.toUpperCase() as $Enums.MaterialRarity,
      icon: enhancementMaterial.icon,
    };
  }

  private convertToKebabCase(input: string): string {
    return input.toLowerCase().replace(/_/g, '-');
  }
}
