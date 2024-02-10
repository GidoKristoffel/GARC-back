import { Injectable } from '@nestjs/common';
import { Entry } from '@gonetone/hoyowiki-api';
import { Page } from '@gonetone/hoyowiki-api/dist/interfaces/EntryPageDataNpcAPIInterface';

@Injectable()
export class DataAutocompleteService {
  private readonly entryApi: Entry = new Entry();

  public async getCharacterById(id: string): Promise<Page> {
    const character: Promise<Page> = this.entryApi
      .get(+id)
      .then((characters: Page) => {
        return characters;
      });
    return await character;
  }
}
