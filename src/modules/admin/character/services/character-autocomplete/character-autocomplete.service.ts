import { Injectable } from '@nestjs/common';
import {
  Component,
  Module,
  Page,
} from '@gonetone/hoyowiki-api/dist/interfaces/EntryPageDataNpcAPIInterface';
import { Entry, Language, setLanguage } from '@gonetone/hoyowiki-api';
import * as cheerio from 'cheerio';

@Injectable()
export class CharacterAutocompleteService {
  private readonly entryApi: Entry = new Entry();

  public async get(id: string): Promise<any> {
    await setLanguage(Language.Russian);
    const character: Promise<any> = this.entryApi
      .get(+id)
      .then((characters: Page) => {
        return JSON.parse(
          characters.modules
            .find((module) => module.id === '1')
            .components.find(
              (component) => component.component_id === 'baseInfo',
            ).data,
        );
        // return JSON.parse(
        //   characters.modules
        //     .find((module) => module.id === '3')
        //     .components.find(
        //       (component) => component.component_id === 'gallery_character',
        //     ).data,
        // );
        // return this.extractConstellationHtml(characters, 'Созвездие:');
      });
    return await character;
  }

  private extractConstellationHtml(characters: Page, key: string): string {
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
