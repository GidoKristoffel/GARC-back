import { Injectable } from '@nestjs/common';
import { Entry, Language, setLanguage } from '@gonetone/hoyowiki-api';
import {
  Component,
  Module,
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
import * as cheerio from 'cheerio';

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
      quality:
        (pageEn as CharacterPage).filter_values.character_rarity.values[0] ===
        '5-Star'
          ? $Enums.Quality.LEGENDARY
          : (pageEn as CharacterPage).filter_values.character_rarity
              .values[0] === '4-Star'
          ? $Enums.Quality.EPIC
          : $Enums.Quality.OTHER,
      elementalType: (
        pageEn as CharacterPage
      ).filter_values.character_vision.values[0].toUpperCase() as $Enums.Element,
      region: (pageEn as CharacterPage).filter_values.character_region.values[0]
        .split(' ')[0]
        .toUpperCase() as $Enums.Region,
      bonusAttribute: (
        pageEn as CharacterPage
      ).filter_values.character_property.values[0]
        .toUpperCase()
        .replace(/ /g, '_') as $Enums.BonusAttribute,
      weapon: (
        pageEn as CharacterPage
      ).filter_values.character_weapon.values[0].toUpperCase() as $Enums.WeaponType,
      constellationEn: this.getCharacterInfo(pageEn, [
        'Constellation',
        'Constellation:',
      ]),
      constellationUa: '',
      constellationRu: this.getCharacterInfo(pageRu, [
        'Созвездие',
        'Созвездие:',
      ]),
      arche: [],
      birthday: this.getBirthday(
        this.getCharacterInfo(pageEn, ['Birthday', 'Birthday:']),
      ),
      titleEn: this.getCharacterInfo(pageEn, ['Title', 'Title:']),
      titleUa: '',
      titleRu: this.getCharacterInfo(pageRu, ['Титул', 'Титул:']),
      affiliationEn: this.getCharacterInfo(pageEn, [
        'Affiliation',
        'Affiliation:',
      ]),
      affiliationUa: '',
      affiliationRu: this.getCharacterInfo(pageRu, ['Группа', 'Группа:']),
      icon: pageEn.icon_url,
      splashArt: this.getCharacterPictures(pageEn).splashArt,
      cardIcon: this.getCharacterPictures(pageEn).cardIcon,
    };
  }

  private getCharacterInfo(characters: TEntry, keys: string[]): string {
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
    ).list.find((item: { key: string }) => keys.includes(item.key))?.value[0];
    return this.extractTextFromHtml(value || '');
  }

  private extractTextFromHtml(html: string): string {
    const $ = cheerio.load(html);
    const text = $('p').text().trim();
    return text || html.trim();
  }

  private getCharacterPictures(character: TEntry): {
    splashArt: string;
    cardIcon: string;
  } {
    const pictures = JSON.parse(
      character.modules
        .find((module) => module.id === '3')
        .components.find(
          (component) => component.component_id === 'gallery_character',
        ).data,
    );
    return {
      splashArt: pictures.list[0].img || '',
      cardIcon: pictures.pic || '',
    };
  }

  private getBirthday(date: string): Date {
    const [month, day]: string[] = date.split('/');

    return new Date(Date.UTC(0, parseInt(month) - 1, parseInt(day)));
  }
}
