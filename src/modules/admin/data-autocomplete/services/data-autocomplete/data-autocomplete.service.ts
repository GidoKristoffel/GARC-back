import { Injectable } from '@nestjs/common';
import { Entry } from '@gonetone/hoyowiki-api';
import { Page } from '@gonetone/hoyowiki-api/dist/interfaces/EntryPageDataNpcAPIInterface';
import { ICharacterCreate } from '../../../character/interfaces/common.interface';
import { $Enums } from '.prisma/client';

@Injectable()
export class DataAutocompleteService {
  private readonly entryApi: Entry = new Entry();

  public async getCharacterById(id: string): Promise<ICharacterCreate> {
    const character: Promise<ICharacterCreate> = this.entryApi
      .get(+id)
      .then((characters: Page) => {
        return this.transform(characters);
      });
    return await character;
  }

  private transform(page: Page): ICharacterCreate {
    return {
      nameEn: page.name,
      nameUa: '',
      nameRu: '',
      quality: $Enums.Quality.EPIC,
      elementalType: $Enums.Element.ANEMO,
      region: $Enums.Region.FONTAINE,
      bonusAttribute: $Enums.BonusAttribute.ANEMO_DMG_BONUS,
      weapon: $Enums.WeaponType.SWORD,
      constellationEn: '',
      constellationUa: '',
      constellationRu: '',
      arche: [],
      birthday: new Date(),
      titleEn: '',
      titleUa: '',
      titleRu: '',
      affiliationEn: '',
      affiliationUa: '',
      affiliationRu: '',
      icon: page.icon_url,
      splashArt: '',
      cardIcon: '',
    };
  }
}
