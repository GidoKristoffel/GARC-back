import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { TransformWeaponMaterialService } from '../transform-weapon-material/transform-weapon-material.service';
import {
  IDeletedWeaponMaterial,
  IWeaponMaterial,
} from '../../interfaces/common.interface';
import { WeaponMaterial } from '@prisma/client';
import { WeaponMaterialDto } from '../../dto';

@Injectable()
export class WeaponMaterialService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly transformWeaponMaterialService: TransformWeaponMaterialService,
  ) {}

  public async findOne(id: string): Promise<IWeaponMaterial | null> {
    return this.prismaService.weaponMaterial
      .findFirst({
        where: {
          id,
        },
      })
      .then((weaponMaterial: WeaponMaterial) =>
        this.transformWeaponMaterialService.transformToResponseFormat(
          weaponMaterial,
        ),
      )
      .catch(() => null);
  }

  public async findAll(): Promise<IWeaponMaterial[] | null> {
    return this.prismaService.weaponMaterial
      .findMany()
      .then((weaponMaterials: WeaponMaterial[]) => {
        return weaponMaterials.map((weaponMaterial: WeaponMaterial) =>
          this.transformWeaponMaterialService.transformToResponseFormat(
            weaponMaterial,
          ),
        );
      })
      .catch(() => null);
  }

  public async create(
    weaponMaterial: WeaponMaterialDto,
  ): Promise<IWeaponMaterial | null> {
    const createdWeaponMaterial: WeaponMaterial =
      await this.prismaService.weaponMaterial.create({
        data: this.transformWeaponMaterialService.transformToDBFormat(
          weaponMaterial,
        ),
      });
    return this.transformWeaponMaterialService.transformToResponseFormat(
      createdWeaponMaterial,
    );
  }

  public async update(
    id: string,
    weaponMaterial: WeaponMaterialDto,
  ): Promise<IWeaponMaterial | null> {
    const updatedWeaponMaterial: WeaponMaterial | null =
      await this.prismaService.weaponMaterial.update({
        where: {
          id,
        },
        data: this.transformWeaponMaterialService.transformToDBFormat(
          weaponMaterial,
        ),
      });

    if (!updatedWeaponMaterial) {
      return null;
    }

    return this.transformWeaponMaterialService.transformToResponseFormat(
      updatedWeaponMaterial,
    );
  }

  public async delete(id: string): Promise<IDeletedWeaponMaterial> {
    return this.prismaService.weaponMaterial.delete({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });
  }
}
