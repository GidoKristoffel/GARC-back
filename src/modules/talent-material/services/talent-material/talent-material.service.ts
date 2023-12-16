import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { TalentMaterial } from '@prisma/client';
import { TransformTalentMaterialService } from '../transform-talent-material/transform-talent-material.service';
import {
  IDeletedTalentMaterial,
  ITalentMaterial,
} from '../../interfaces/common.interface';
import { TalentMaterialDto } from '../../dto';

@Injectable()
export class TalentMaterialService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly transformTalentMaterialService: TransformTalentMaterialService,
  ) {}

  public async findOne(id: string): Promise<ITalentMaterial | null> {
    return this.prismaService.talentMaterial
      .findFirst({
        where: {
          id,
        },
      })
      .then((talentMaterial: TalentMaterial) =>
        this.transformTalentMaterialService.transformToResponseFormat(
          talentMaterial,
        ),
      )
      .catch(() => null);
  }

  public async findAll(): Promise<ITalentMaterial[] | null> {
    return this.prismaService.talentMaterial
      .findMany()
      .then((talentMaterials: TalentMaterial[]) => {
        return talentMaterials.map((talentMaterial: TalentMaterial) =>
          this.transformTalentMaterialService.transformToResponseFormat(
            talentMaterial,
          ),
        );
      })
      .catch(() => null);
  }

  public async create(
    talentMaterial: TalentMaterialDto,
  ): Promise<ITalentMaterial | null> {
    const createdTalentMaterial: TalentMaterial =
      await this.prismaService.talentMaterial.create({
        data: this.transformTalentMaterialService.transformToDBFormat(
          talentMaterial,
        ),
      });
    return this.transformTalentMaterialService.transformToResponseFormat(
      createdTalentMaterial,
    );
  }

  public async update(
    id: string,
    talentMaterial: TalentMaterialDto,
  ): Promise<ITalentMaterial | null> {
    const updatedTalentMaterial: TalentMaterial | null =
      await this.prismaService.talentMaterial.update({
        where: {
          id,
        },
        data: this.transformTalentMaterialService.transformToDBFormat(
          talentMaterial,
        ),
      });

    if (!updatedTalentMaterial) {
      return null;
    }

    return this.transformTalentMaterialService.transformToResponseFormat(
      updatedTalentMaterial,
    );
  }

  public async delete(id: string): Promise<IDeletedTalentMaterial> {
    return this.prismaService.talentMaterial.delete({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });
  }
}
