import { Injectable } from '@nestjs/common';
import { $Enums } from '.prisma/client';
import { TalentMaterial } from '@prisma/client';
import {
  ITalentMaterial,
  ITalentMaterialCreate,
} from '../../interfaces/common.interface';
import { ETalentMaterialType } from '../../../../core/enums/talent-material-type.enum';
import { TalentMaterialDto } from '../../dto';
import { EMaterialRarity } from '../../../../core/enums/material-rarity.enum';
import { ERegion } from '../../../character/enums/region.enum';
import { EDay } from '../../../../core/enums/day.enum';

@Injectable()
export class TransformTalentMaterialService {
  public transformToResponseFormat(
    data: TalentMaterial,
  ): ITalentMaterial | null {
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
      type: this.convertToKebabCase(data.type) as ETalentMaterialType,
      rarity: this.convertToKebabCase(data.rarity) as EMaterialRarity,
      region: this.convertToKebabCase(data.region) as ERegion,
      farmDays: data.farmDays.map((day) => day.toLowerCase()) as EDay[],
      icon: data.icon,
    };
  }

  public transformToDBFormat(
    talentMaterial: TalentMaterialDto,
  ): ITalentMaterialCreate {
    return {
      nameEn: talentMaterial.name.en,
      nameUa: talentMaterial.name.ua,
      nameRu: talentMaterial.name.ru,
      descriptionEn: talentMaterial.description.en,
      descriptionUa: talentMaterial.description.ua,
      descriptionRu: talentMaterial.description.ru,
      type: talentMaterial.type.toUpperCase() as $Enums.TalentMaterialType,
      rarity: talentMaterial.rarity.toUpperCase() as $Enums.MaterialRarity,
      region: talentMaterial.region.toUpperCase() as $Enums.Region,
      farmDays: talentMaterial.farmDays.map((day: EDay) =>
        day.toUpperCase(),
      ) as $Enums.Day[],
      icon: talentMaterial.icon,
    };
  }

  private convertToKebabCase(input: string): string {
    return input.toLowerCase().replace(/_/g, '-');
  }
}
