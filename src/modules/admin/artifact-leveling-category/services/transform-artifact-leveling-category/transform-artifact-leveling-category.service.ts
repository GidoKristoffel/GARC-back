import { Injectable } from '@nestjs/common';
import { ArtifactLevelingCategory } from '@prisma/client';
import {
  IArtifactLevelingCategory,
  IArtifactLevelingCategoryCreate,
} from '../../interfaces/common.interface';
import { AscensionMaterialDto } from '../../../ascension-material/dto';
import { IAscensionMaterialCreate } from '../../../ascension-material/interfaces/common.interface';
import { $Enums } from '.prisma/client';
import { ArtifactLevelingCategoryDto } from '../../dto';

@Injectable()
export class TransformArtifactLevelingCategoryService {
  public transformToResponseFormat(
    data: ArtifactLevelingCategory,
  ): IArtifactLevelingCategory | null {
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
      index: data.index,
    };
  }

  public transformToDBFormat(
    ascensionMaterial: ArtifactLevelingCategoryDto,
  ): IArtifactLevelingCategoryCreate {
    return {
      nameEn: ascensionMaterial.name.en,
      nameUa: ascensionMaterial.name.ua,
      nameRu: ascensionMaterial.name.ru,
      index: ascensionMaterial.index,
    };
  }

  private convertToKebabCase(input: string): string {
    return input.toLowerCase().replace(/_/g, '-');
  }
}
