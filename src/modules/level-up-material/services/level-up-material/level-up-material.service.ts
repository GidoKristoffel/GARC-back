import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { LevelUpMaterial } from '@prisma/client';
import { TransformLevelUpMaterialService } from '../transform-level-up-material/transform-level-up-material.service';
import {
  IDeletedLevelUpMaterial,
  ILevelUpMaterial,
} from '../../interfaces/common.interface';
import { LevelUpMaterialDto } from '../../dto';

@Injectable()
export class LevelUpMaterialService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly transformLevelUpMaterialService: TransformLevelUpMaterialService,
  ) {}

  public async findOne(id: string): Promise<ILevelUpMaterial | null> {
    return this.prismaService.levelUpMaterial
      .findFirst({
        where: {
          id,
        },
      })
      .then((levelUpMaterial: LevelUpMaterial) =>
        this.transformLevelUpMaterialService.transformToResponseFormat(
          levelUpMaterial,
        ),
      )
      .catch(() => null);
  }

  public async findAll(): Promise<ILevelUpMaterial[] | null> {
    return this.prismaService.levelUpMaterial
      .findMany()
      .then((levelUpMaterials: LevelUpMaterial[]) => {
        return levelUpMaterials.map((levelUpMaterial: LevelUpMaterial) =>
          this.transformLevelUpMaterialService.transformToResponseFormat(
            levelUpMaterial,
          ),
        );
      })
      .catch(() => null);
  }

  public async create(
    levelUpMaterial: LevelUpMaterialDto,
  ): Promise<ILevelUpMaterial | null> {
    const createdLevelUpMaterial: LevelUpMaterial =
      await this.prismaService.levelUpMaterial.create({
        data: this.transformLevelUpMaterialService.transformToDBFormat(
          levelUpMaterial,
        ),
      });
    return this.transformLevelUpMaterialService.transformToResponseFormat(
      createdLevelUpMaterial,
    );
  }

  public async update(
    id: string,
    levelUpMaterial: LevelUpMaterialDto,
  ): Promise<ILevelUpMaterial | null> {
    const updatedLevelUpMaterial: LevelUpMaterial | null =
      await this.prismaService.levelUpMaterial.update({
        where: {
          id,
        },
        data: this.transformLevelUpMaterialService.transformToDBFormat(
          levelUpMaterial,
        ),
      });

    if (!updatedLevelUpMaterial) {
      return null;
    }

    return this.transformLevelUpMaterialService.transformToResponseFormat(
      updatedLevelUpMaterial,
    );
  }

  public async delete(id: string): Promise<IDeletedLevelUpMaterial> {
    return this.prismaService.levelUpMaterial.delete({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });
  }
}
