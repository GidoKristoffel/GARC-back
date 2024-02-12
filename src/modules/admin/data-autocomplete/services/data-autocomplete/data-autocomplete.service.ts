import { Injectable } from '@nestjs/common';
import { Entry, Language, setLanguage } from '@gonetone/hoyowiki-api';
import {
  type Page as NpcPage,
} from '@gonetone/hoyowiki-api/dist/interfaces/EntryPageDataNpcAPIInterface';
import { ICharacterCreate } from '../../../character/interfaces/common.interface';
import { $Enums } from '.prisma/client';
import type { Page as CharacterPage } from '@gonetone/hoyowiki-api/dist/interfaces/EntryPageDataCharacterAPIInterface';
import type { Page as WeaponPage } from '@gonetone/hoyowiki-api/dist/interfaces/EntryPageDataWeaponAPIInterface';
import type { Page as ArtifactPage } from '@gonetone/hoyowiki-api/dist/interfaces/EntryPageDataArtifactAPIInterface';
import type { Page as EnemyPage } from '@gonetone/hoyowiki-api/dist/interfaces/EntryPageDataEnemyAPIInterface';
import type { Page as MaterialPage } from '@gonetone/hoyowiki-api/dist/interfaces/EntryPageDataMaterialAPIInterface';
import type { Page as AnimalPage } from '@gonetone/hoyowiki-api/dist/interfaces/EntryPageDataAnimalAPIInterface';
import type { Page as BookPage } from '@gonetone/hoyowiki-api/dist/interfaces/EntryPageDataBookAPIInterface';
import type { Page as TutorialPage } from '@gonetone/hoyowiki-api/dist/interfaces/EntryPageDataTutorialAPIInterface';

export type TEntry =
  | CharacterPage
  | WeaponPage
  | ArtifactPage
  | EnemyPage
  | MaterialPage
  | NpcPage
  | AnimalPage
  | BookPage
  | TutorialPage;

@Injectable()
export class DataAutocompleteService {
  private readonly entryApi: Entry = new Entry();

  public async getCharacterById(id: string): Promise<ICharacterCreate> {
    await setLanguage(Language.EnglishUS);
    const characterEn: TEntry = await this.entryApi.get(+id);

    await setLanguage(Language.Russian);
    const characterRu: TEntry = await this.entryApi.get(+id);

    return this.transform(characterEn, characterRu);
  }

  private transform(pageEn: TEntry, pageRu: TEntry): ICharacterCreate {
    return {
      nameEn: pageEn.name,
      nameUa: '',
      nameRu: pageRu.name,
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
      icon: pageEn.icon_url,
      splashArt: '',
      cardIcon: '',
    };
  }
}
