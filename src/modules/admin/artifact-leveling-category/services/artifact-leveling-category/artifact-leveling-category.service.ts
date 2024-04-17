import { Injectable } from '@nestjs/common';
import { IAscensionMaterial } from '../../../ascension-material/interfaces/common.interface';
import { ArtifactLevelingCategory, AscensionMaterial } from '@prisma/client';
import { PrismaService } from '../../../../shared/prisma/prisma.service';
import { TransformArtifactLevelingCategoryService } from '../transform-artifact-leveling-category/transform-artifact-leveling-category.service';
import { IArtifactLevelingCategory } from '../../interfaces/common.interface';

@Injectable()
export class ArtifactLevelingCategoryService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly transformArtifactLevelingCategoryService: TransformArtifactLevelingCategoryService,
  ) {}

  public async findOne(id: string): Promise<IArtifactLevelingCategory | null> {
    return this.prismaService.artifactLevelingCategory
      .findFirst({
        where: {
          id,
        },
      })
      .then((artifactLevelingCategory: ArtifactLevelingCategory) =>
        this.transformArtifactLevelingCategoryService.transformToResponseFormat(
          artifactLevelingCategory,
        ),
      )
      .catch(() => null);
  }

  public async findAll(): Promise<IAscensionMaterial[] | null> {
    return this.prismaService.artifactLevelingCategory
      .findMany()
      .then((artifactLevelingCategories: ArtifactLevelingCategory[]) => {
        return artifactLevelingCategories.map(
          (artifactLevelingCategory: ArtifactLevelingCategory) =>
            this.transformArtifactLevelingCategoryService.transformToResponseFormat(
              artifactLevelingCategory,
            ),
        );
      })
      .catch(() => null);
  }
}
