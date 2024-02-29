import { Injectable } from '@nestjs/common';
import { $Enums } from '.prisma/client';
import { Weapon } from '@prisma/client';
import { IWeapon, IWeaponCreate } from '../../interfaces/common.interface';
import { EWeaponType } from '../../../../../core/enums/weapon-type.enum';
import { EWeaponBonusAttribute } from '../../../../../core/enums/weapon-bonus-attribute.enum';
import { EWeaponQuality } from '../../../../../core/enums/weapon-quality.enum';
import { WeaponDto } from '../../dto';
import { ERegion } from '../../../../../core/enums/region.enum';

@Injectable()
export class TransformWeaponService {
  public transformToResponseFormat(data: Weapon): IWeapon | null {
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
      abilityDescription: {
        en: data.abilityDescriptionEn,
        ua: data.abilityDescriptionUa,
        ru: data.abilityDescriptionRu,
      },
      type: this.convertToKebabCase(data.type) as EWeaponType,
      bonusAttribute: this.convertToKebabCase(
        data.bonusAttribute,
      ) as EWeaponBonusAttribute,
      quality: this.convertToKebabCase(data.quality) as EWeaponQuality,
      region: this.convertToKebabCase(data.region) as ERegion,
      splashArtOriginal: data.splashArtOriginal,
      splashArtAwakened: data.splashArtAwakened,
      splashArtPneuma: data.splashArtPneuma,
      splashArtOusia: data.splashArtOusia,
    };
  }

  public transformToDBFormat(weapon: WeaponDto): IWeaponCreate {
    return {
      nameEn: weapon.name.en,
      nameUa: weapon.name.ua,
      nameRu: weapon.name.ru,
      descriptionEn: weapon.description.en,
      descriptionUa: weapon.description.ua,
      descriptionRu: weapon.description.ru,
      abilityDescriptionEn: weapon.abilityDescription.en,
      abilityDescriptionUa: weapon.abilityDescription.ua,
      abilityDescriptionRu: weapon.abilityDescription.ru,
      type: weapon.type.toUpperCase() as $Enums.WeaponType,
      bonusAttribute:
        weapon.bonusAttribute.toUpperCase() as $Enums.WeaponBonusAttribute,
      quality: weapon.quality.toUpperCase() as $Enums.WeaponQuality,
      region: weapon.region.toUpperCase() as $Enums.Region,
      splashArtOriginal: weapon.splashArtOriginal,
      splashArtAwakened: weapon.splashArtAwakened,
      splashArtPneuma: weapon.splashArtPneuma,
      splashArtOusia: weapon.splashArtOusia,
    };
  }

  private convertToKebabCase(input: string): string {
    return input.toLowerCase().replace(/_/g, '-');
  }
}
