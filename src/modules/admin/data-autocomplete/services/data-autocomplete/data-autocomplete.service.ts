import { Injectable } from '@nestjs/common';
import { Entry, Language, setLanguage } from '@gonetone/hoyowiki-api';
import {
  Component,
  Module,
  Page,
  type Page as NpcPage
} from "@gonetone/hoyowiki-api/dist/interfaces/EntryPageDataNpcAPIInterface";
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
import * as cheerio from "cheerio";

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
      constellationEn: this.extractConstellationHtml(pageEn, 'Constellation'),
      constellationUa: '',
      constellationRu: this.extractConstellationHtml(pageRu, 'Созвездие:'),
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


  private extractConstellationHtml(characters: TEntry, key: string): string {
    const attributesModule: Module | undefined = characters.modules.find(
      (module) => module.id === '1',
    );
    const baseInfoComponent: Component | undefined =
      attributesModule?.components.find(
        (component) => component.component_id === 'baseInfo',
      );
    const constellationData: string | undefined = baseInfoComponent?.data;
    const value: string | undefined = JSON.parse(
      constellationData || '',
    ).list.find((item) => item.key === key)?.value[0];
    return this.extractTextFromHtml(value || '');
  }

  private extractTextFromHtml(html: string): string {
    const $ = cheerio.load(html);
    return $('p').text().trim();
  }
}
