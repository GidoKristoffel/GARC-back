import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { TransformEnhancementMaterialService } from '../transform-enhancement-material/transform-enhancement-material.service';
import {
  IDeletedEnhancementMaterial,
  IEnhancementMaterial,
} from '../../interfaces/common.interface';
import { EnhancementMaterial } from '@prisma/client';
import { EnhancementMaterialDto } from '../../dto';

@Injectable()
export class EnhancementMaterialService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly transformEnhancementMaterialService: TransformEnhancementMaterialService,
  ) {}

  public async findOne(id: string): Promise<IEnhancementMaterial | null> {
    return this.prismaService.enhancementMaterial
      .findFirst({
        where: {
          id,
        },
      })
      .then((enhancementMaterial: EnhancementMaterial) =>
        this.transformEnhancementMaterialService.transformToResponseFormat(
          enhancementMaterial,
        ),
      )
      .catch(() => null);
  }

  public async findAll(): Promise<IEnhancementMaterial[] | null> {
    return this.prismaService.enhancementMaterial
      .findMany()
      .then((enhancementMaterials: EnhancementMaterial[]) => {
        return enhancementMaterials.map(
          (enhancementMaterial: EnhancementMaterial) =>
            this.transformEnhancementMaterialService.transformToResponseFormat(
              enhancementMaterial,
            ),
        );
      })
      .catch(() => null);
  }

  public async create(
    enhancementMaterial: EnhancementMaterialDto,
  ): Promise<IEnhancementMaterial | null> {
    const createdEnhancementMaterial: EnhancementMaterial =
      await this.prismaService.enhancementMaterial.create({
        data: this.transformEnhancementMaterialService.transformToDBFormat(
          enhancementMaterial,
        ),
      });
    return this.transformEnhancementMaterialService.transformToResponseFormat(
      createdEnhancementMaterial,
    );
  }

  public async update(
    id: string,
    enhancementMaterial: EnhancementMaterialDto,
  ): Promise<IEnhancementMaterial | null> {
    const updatedEnhancementMaterial: EnhancementMaterial | null =
      await this.prismaService.enhancementMaterial.update({
        where: {
          id,
        },
        data: this.transformEnhancementMaterialService.transformToDBFormat(
          enhancementMaterial,
        ),
      });

    if (!updatedEnhancementMaterial) {
      return null;
    }

    return this.transformEnhancementMaterialService.transformToResponseFormat(
      updatedEnhancementMaterial,
    );
  }

  public async delete(id: string): Promise<IDeletedEnhancementMaterial> {
    return this.prismaService.enhancementMaterial.delete({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });
  }
}
