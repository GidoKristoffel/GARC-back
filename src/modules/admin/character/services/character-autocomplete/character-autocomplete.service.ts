import { Injectable } from '@nestjs/common';
import { Page } from '@gonetone/hoyowiki-api/dist/interfaces/EntryPageDataNpcAPIInterface';
import { Entry } from '@gonetone/hoyowiki-api';

@Injectable()
export class CharacterAutocompleteService {
  private readonly entryApi: Entry = new Entry();

  public async get(id: string): Promise<Page> {
    const character: Promise<Page> = this.entryApi
      .get(+id)
      .then((characters: Page) => {
        return characters;
      });
    return await character;
  }
}
