import { Injectable } from '@nestjs/common';
import { WeaponMaterial } from '@prisma/client';
import {
  IWeaponMaterial,
  IWeaponMaterialCreate,
} from '../../interfaces/common.interface';
import { EWeaponMaterialType } from '../../../../../core/enums/weapon-material-type.enum';
import { EMaterialRarity } from '../../../../../core/enums/material-rarity.enum';
import { ERegion } from '../../../../character/enums/region.enum';
import { EDay } from '../../../../../core/enums/day.enum';
import { WeaponMaterialDto } from '../../dto';
import { $Enums } from '.prisma/client';

@Injectable()
export class TransformWeaponMaterialService {
  public transformToResponseFormat(
    data: WeaponMaterial,
  ): IWeaponMaterial | null {
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
      type: this.convertToKebabCase(data.type) as EWeaponMaterialType,
      rarity: this.convertToKebabCase(data.rarity) as EMaterialRarity,
      region: this.convertToKebabCase(data.region) as ERegion,
      farmDays: data.farmDays.map((day) => day.toLowerCase()) as EDay[],
      icon: data.icon,
    };
  }

  public transformToDBFormat(
    weaponMaterial: WeaponMaterialDto,
  ): IWeaponMaterialCreate {
    return {
      nameEn: weaponMaterial.name.en,
      nameUa: weaponMaterial.name.ua,
      nameRu: weaponMaterial.name.ru,
      descriptionEn: weaponMaterial.description.en,
      descriptionUa: weaponMaterial.description.ua,
      descriptionRu: weaponMaterial.description.ru,
      type: weaponMaterial.type.toUpperCase() as $Enums.WeaponMaterialType,
      rarity: weaponMaterial.rarity.toUpperCase() as $Enums.MaterialRarity,
      region: weaponMaterial.region.toUpperCase() as $Enums.Region,
      farmDays: weaponMaterial.farmDays.map((day: EDay) =>
        day.toUpperCase(),
      ) as $Enums.Day[],
      icon: weaponMaterial.icon,
    };
  }

  private convertToKebabCase(input: string): string {
    return input.toLowerCase().replace(/_/g, '-');
  }
}
