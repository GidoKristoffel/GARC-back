import { Injectable } from '@nestjs/common';
import {
  Component,
  Module,
} from '@gonetone/hoyowiki-api/dist/interfaces/EntryPageDataNpcAPIInterface';
import { Entry, Language, setLanguage } from '@gonetone/hoyowiki-api';
import * as cheerio from 'cheerio';
import { GoogleTranslateService } from '../../../../../core/services/google-translate/google-translate.service';
import { ICharacterCreate } from '../../interfaces/common.interface';
import { $Enums } from '.prisma/client';
import type { Page as CharacterPage } from '@gonetone/hoyowiki-api/dist/interfaces/EntryPageDataCharacterAPIInterface';
import { TEntry } from '../../../data-autocomplete/services/data-autocomplete/data-autocomplete.service';

@Injectable()
export class CharacterAutocompleteService {
  private readonly entryApi: Entry = new Entry();

  constructor(private readonly translateService: GoogleTranslateService) {}

  public async getCharacterById(id: string): Promise<ICharacterCreate> {
    await setLanguage(Language.EnglishUS);
    const characterEn: TEntry = await this.entryApi.get(+id);

    await setLanguage(Language.Russian);
    const characterRu: TEntry = await this.entryApi.get(+id);

    return this.transform(characterEn, characterRu);
  }

  private async transform(
    pageEn: TEntry,
    pageRu: TEntry,
  ): Promise<ICharacterCreate> {
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

  private getQuality(page: TEntry): $Enums.Quality {
    const rarity: string = (page as CharacterPage).filter_values
      .character_rarity.values[0];

    switch (rarity) {
      case '5-Star':
        return $Enums.Quality.LEGENDARY;
      case '4-Star':
        return $Enums.Quality.EPIC;
      default:
        return $Enums.Quality.OTHER;
    }
  }

  private getElementalType(page: TEntry): $Enums.Element {
    return (
      page as CharacterPage
    ).filter_values.character_vision.values[0].toUpperCase() as $Enums.Element;
  }

  private getRegion(page: TEntry): $Enums.Region {
    return (page as CharacterPage).filter_values.character_region.values[0]
      .split(' ')[0]
      .toUpperCase() as $Enums.Region;
  }

  private getBonusAttribute(page: TEntry): $Enums.BonusAttribute {
    return (page as CharacterPage).filter_values.character_property.values[0]
      .toUpperCase()
      .replace(/ /g, '_') as $Enums.BonusAttribute;
  }

  private getWeapon(page: TEntry): $Enums.WeaponType {
    return (
      page as CharacterPage
    ).filter_values.character_weapon.values[0].toUpperCase() as $Enums.WeaponType;
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

  private getArche(page: TEntry): $Enums.Arche[] {
    const arche: string = this.getCharacterInfo(page, 'Архэ');

    const result: $Enums.Arche[] = [];

    if (arche.includes('Усия')) {
      result.push($Enums.Arche.OUSIA);
    }

    if (arche.includes('Пневма')) {
      result.push($Enums.Arche.PNEUMA);
    }

    return result;
  }

  private extractTextFromHtml(html: string): string {
    const $: cheerio.CheerioAPI = cheerio.load(html);
    const text: string = $('p').text().trim();
    return text || html.trim();
  }
}
