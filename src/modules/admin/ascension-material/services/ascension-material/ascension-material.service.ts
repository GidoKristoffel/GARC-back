import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../shared/prisma/prisma.service';
import { TransformAscensionMaterialService } from '../transform-ascension-material/transform-ascension-material.service';
import {
  IAscensionMaterial,
  IDeletedAscensionMaterial,
} from '../../interfaces/common.interface';
import { AscensionMaterial } from '@prisma/client';
import { AscensionMaterialDto } from '../../dto';

@Injectable()
export class AscensionMaterialService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly transformAscensionMaterialService: TransformAscensionMaterialService,
  ) {}

  public async findOne(id: string): Promise<IAscensionMaterial | null> {
    return this.prismaService.ascensionMaterial
      .findFirst({
        where: {
          id,
        },
      })
      .then((ascensionMaterial: AscensionMaterial) =>
        this.transformAscensionMaterialService.transformToResponseFormat(
          ascensionMaterial,
        ),
      )
      .catch(() => null);
  }

  public async findAll(): Promise<IAscensionMaterial[] | null> {
    return this.prismaService.ascensionMaterial
      .findMany()
      .then((ascensionMaterials: AscensionMaterial[]) => {
        return ascensionMaterials.map((ascensionMaterial: AscensionMaterial) =>
          this.transformAscensionMaterialService.transformToResponseFormat(
            ascensionMaterial,
          ),
        );
      })
      .catch(() => null);
  }

  public async create(
    ascensionMaterial: AscensionMaterialDto,
  ): Promise<IAscensionMaterial | null> {
    const createdAscensionMaterial: AscensionMaterial =
      await this.prismaService.ascensionMaterial.create({
        data: this.transformAscensionMaterialService.transformToDBFormat(
          ascensionMaterial,
        ),
      });
    return this.transformAscensionMaterialService.transformToResponseFormat(
      createdAscensionMaterial,
    );
  }

  public async update(
    id: string,
    ascensionMaterial: AscensionMaterialDto,
  ): Promise<IAscensionMaterial | null> {
    const updatedAscensionMaterial: AscensionMaterial | null =
      await this.prismaService.ascensionMaterial.update({
        where: {
          id,
        },
        data: this.transformAscensionMaterialService.transformToDBFormat(
          ascensionMaterial,
        ),
      });

    if (!updatedAscensionMaterial) {
      return null;
    }

    return this.transformAscensionMaterialService.transformToResponseFormat(
      updatedAscensionMaterial,
    );
  }

  public async delete(id: string): Promise<IDeletedAscensionMaterial> {
    return this.prismaService.ascensionMaterial.delete({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });
  }
}
