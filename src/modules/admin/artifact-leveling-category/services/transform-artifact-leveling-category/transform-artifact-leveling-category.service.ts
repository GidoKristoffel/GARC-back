import { Injectable } from '@nestjs/common';
import { ArtifactLevelingCategory } from '@prisma/client';
import { IArtifactLevelingCategory } from '../../interfaces/common.interface';

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

  private convertToKebabCase(input: string): string {
    return input.toLowerCase().replace(/_/g, '-');
  }
}
