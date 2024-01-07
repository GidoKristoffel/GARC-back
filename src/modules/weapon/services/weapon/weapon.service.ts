import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { TransformWeaponService } from '../transform-weapon/transform-weapon.service';
import { IDeletedWeapon, IWeapon } from '../../interfaces/common.interface';
import { Weapon } from '@prisma/client';
import { WeaponDto } from '../../dto';

@Injectable()
export class WeaponService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly transformWeaponService: TransformWeaponService,
  ) {}

  public async findOne(id: string): Promise<IWeapon | null> {
    return this.prismaService.weapon
      .findFirst({
        where: {
          id,
        },
      })
      .then((weapon: Weapon) =>
        this.transformWeaponService.transformToResponseFormat(weapon),
      )
      .catch(() => null);
  }

  public async findAll(): Promise<IWeapon[] | null> {
    return this.prismaService.weapon
      .findMany()
      .then((weapons: Weapon[]) => {
        return weapons.map((weapon: Weapon) =>
          this.transformWeaponService.transformToResponseFormat(weapon),
        );
      })
      .catch(() => null);
  }

  public async create(weapon: WeaponDto): Promise<IWeapon | null> {
    const createdWeapon: Weapon = await this.prismaService.weapon.create({
      data: this.transformWeaponService.transformToDBFormat(weapon),
    });
    return this.transformWeaponService.transformToResponseFormat(createdWeapon);
  }

  public async update(id: string, weapon: WeaponDto): Promise<IWeapon | null> {
    const updatedWeapon: Weapon | null = await this.prismaService.weapon.update(
      {
        where: {
          id,
        },
        data: this.transformWeaponService.transformToDBFormat(weapon),
      },
    );

    if (!updatedWeapon) {
      return null;
    }

    return this.transformWeaponService.transformToResponseFormat(updatedWeapon);
  }

  public async delete(id: string): Promise<IDeletedWeapon> {
    return this.prismaService.weapon.delete({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });
  }
}
