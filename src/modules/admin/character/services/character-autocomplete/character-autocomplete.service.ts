import { Injectable } from '@nestjs/common';
import {
  Component,
  Module,
  type Page as NpcPage,
} from '@gonetone/hoyowiki-api/dist/interfaces/EntryPageDataNpcAPIInterface';
import { Entry, Language, setLanguage } from '@gonetone/hoyowiki-api';
import * as cheerio from 'cheerio';
import { GoogleTranslateService } from '../../../../../core/services/google-translate/google-translate.service';
import { IAutocompleteCharacter } from '../../interfaces/common.interface';
import type { Page as CharacterPage } from '@gonetone/hoyowiki-api/dist/interfaces/EntryPageDataCharacterAPIInterface';
import { EQuality } from '../../../../../core/enums/quality.enum';
import { EElement } from '../../../../../core/enums/element.enum';
import { ERegion } from '../../../../../core/enums/region.enum';
import { EArche } from '../../../../../core/enums/arche.enum';
import { ECharacterBonusAttribute } from '../../../../../core/enums/character-bonus-attribute.enum';
import type { Page as WeaponPage } from '@gonetone/hoyowiki-api/dist/interfaces/EntryPageDataWeaponAPIInterface';
import type { Page as ArtifactPage } from '@gonetone/hoyowiki-api/dist/interfaces/EntryPageDataArtifactAPIInterface';
import type { Page as EnemyPage } from '@gonetone/hoyowiki-api/dist/interfaces/EntryPageDataEnemyAPIInterface';
import type { Page as MaterialPage } from '@gonetone/hoyowiki-api/dist/interfaces/EntryPageDataMaterialAPIInterface';
import type { Page as AnimalPage } from '@gonetone/hoyowiki-api/dist/interfaces/EntryPageDataAnimalAPIInterface';
import type { Page as BookPage } from '@gonetone/hoyowiki-api/dist/interfaces/EntryPageDataBookAPIInterface';
import type { Page as TutorialPage } from '@gonetone/hoyowiki-api/dist/interfaces/EntryPageDataTutorialAPIInterface';
import { EWeaponType } from '../../../../../core/enums/weapon-type.enum';

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
export class CharacterAutocompleteService {
  private readonly entryApi: Entry = new Entry();

  constructor(private readonly translateService: GoogleTranslateService) {}

  public async getCharacterById(id: string): Promise<IAutocompleteCharacter> {
    await setLanguage(Language.EnglishUS);
    const characterEn: TEntry = await this.entryApi.get(+id);

    await setLanguage(Language.Russian);
    const characterRu: TEntry = await this.entryApi.get(+id);

    return this.transform(characterEn, characterRu);
  }

  private async transform(
    pageEn: TEntry,
    pageRu: TEntry,
  ): Promise<IAutocompleteCharacter> {
    return {
      nameEn: pageEn.name,
      nameUa: await this.getNameUa(pageRu),
      nameRu: pageRu.name,
      quality: this.getQuality(pageEn),
      elementalType: this.getElementalType(pageEn),
      region: this.getRegion(pageEn),
      bonusAttribute: this.getBonusAttribute(pageEn),
      weapon: this.getWeapon(pageEn),
      constellationEn: this.getCharacterInfo(pageEn, 'Constellation'),
      constellationUa: await this.getConstellationUa(pageRu),
      constellationRu: this.getCharacterInfo(pageRu, 'Созвездие'),
      arche: this.getArche(pageRu),
      birthday: this.getBirthday(this.getCharacterInfo(pageEn, 'Birthday')),
      titleEn: this.getCharacterInfo(pageEn, 'Title'),
      titleUa: await this.getTitleUa(pageRu),
      titleRu: this.getCharacterInfo(pageRu, 'Титул'),
      affiliationEn: this.getCharacterInfo(pageEn, 'Affiliation'),
      affiliationUa: await this.getAffiliationUa(pageRu),
      affiliationRu: this.getCharacterInfo(pageRu, 'Группа'),
      icon: pageEn.icon_url,
      splashArt: this.getCharacterPictures(pageEn).splashArt,
      cardIcon: this.getCharacterPictures(pageEn).cardIcon,
    };
  }

  private getCharacterInfo(characters: TEntry, key: string): string {
    const attributesModule: Module = characters.modules.find(
      (module: Module): boolean => module.id === '1',
    );

    if (!attributesModule) {
      return '';
    }

    const baseInfoComponent: Component = attributesModule.components.find(
      (component: Component): boolean => component.component_id === 'baseInfo',
    );

    if (!baseInfoComponent || !baseInfoComponent.data) {
      return '';
    }

    const parsedData = JSON.parse(baseInfoComponent.data);
    const value = parsedData.list.find(
      (item: { key: string }): boolean => item.key.replace(/:$/, '') === key,
    )?.value[0];

    if (!value) {
      return '';
    }

    return this.extractTextFromHtml(value);
  }

  private getCharacterPictures(character: TEntry): {
    splashArt: string;
    cardIcon: string;
  } {
    const galleryModule: Module = character.modules.find(
      (module: Module): boolean => module.id === '3',
    );

    if (!galleryModule || !galleryModule.components.length) {
      return { splashArt: '', cardIcon: '' };
    }

    const galleryComponent: Component = galleryModule.components.find(
      (component: Component): boolean =>
        component.component_id === 'gallery_character',
    );

    if (!galleryComponent || !galleryComponent.data) {
      return { splashArt: '', cardIcon: '' };
    }

    const pictures = JSON.parse(galleryComponent.data);

    const splashArt = pictures.list[0]?.img || '';
    const cardIcon = pictures.pic || '';

    return { splashArt, cardIcon };
  }

  private getQuality(page: TEntry): EQuality {
    const rarity: string = (page as CharacterPage).filter_values
      .character_rarity.values[0];

    switch (rarity) {
      case '5-Star':
        return EQuality.LEGENDARY;
      case '4-Star':
        return EQuality.EPIC;
      default:
        return EQuality.OTHER;
    }
  }

  private getElementalType(page: TEntry): EElement {
    const elementalType: string =
      (page as CharacterPage).filter_values.character_vision.values[0] ||
      'Other';
    return elementalType.toLowerCase() as EElement;
  }

  private getRegion(page: TEntry): ERegion {
    const region: string =
      (page as CharacterPage).filter_values.character_region.values[0] ||
      'Other';
    return region.split(' ')[0].toLowerCase() as ERegion;
  }

  private getBonusAttribute(page: TEntry): ECharacterBonusAttribute {
    const bonusAttribute: string =
      (page as CharacterPage).filter_values.character_property.values[0] ||
      'Other';
    return bonusAttribute
      .toLowerCase()
      .replace(/ /g, '-') as ECharacterBonusAttribute;
  }

  private getWeapon(page: TEntry): EWeaponType {
    const weapon: string =
      (page as CharacterPage).filter_values.character_weapon.values[0] ||
      'Other';
    return weapon.toLowerCase() as EWeaponType;
  }

  private async getNameUa(page: TEntry): Promise<string> {
    try {
      const translatedName: string = await this.translateService.get(
        page.name,
        'ru',
        'uk',
      );
      return translatedName || '';
    } catch (error) {
      console.error('Failed to translate name to Ukrainian:', error);
      return '';
    }
  }

  private async getConstellationUa(page: TEntry): Promise<string> {
    const text: string = this.getCharacterInfo(page, 'Созвездие');
    return await this.translateService.get(text, 'ru', 'uk');
  }

  private async getAffiliationUa(page: TEntry): Promise<string> {
    const text: string = this.getCharacterInfo(page, 'Группа');
    return this.translateService.get(text, 'ru', 'uk');
  }

  private async getTitleUa(page: TEntry): Promise<string> {
    const text: string = this.getCharacterInfo(page, 'Титул');
    return this.translateService.get(text, 'ru', 'uk');
  }

  private getBirthday(date: string): Date {
    const [month, day]: string[] = date.split('/');
    return new Date(Date.UTC(0, parseInt(month) - 1, parseInt(day)));
  }

  private getArche(page: TEntry): EArche[] {
    const arche: string = this.getCharacterInfo(page, 'Архэ');

    const result: EArche[] = [];

    if (arche.includes('Усия')) {
      result.push(EArche.OUSIA);
    }

    if (arche.includes('Пневма')) {
      result.push(EArche.PNEUMA);
    }

    return result;
  }

  private extractTextFromHtml(html: string): string {
    const $: cheerio.CheerioAPI = cheerio.load(html);
    const text: string = $('p').text().trim();
    return text || html.trim();
  }
}
