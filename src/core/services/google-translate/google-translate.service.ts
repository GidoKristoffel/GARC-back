import { Injectable } from '@nestjs/common';
import { Translate } from '@google-cloud/translate/build/src/v2';
@Injectable()
export class GoogleTranslateService {
  private readonly translate: Translate;

  constructor() {
    this.translate = new Translate();
  }

  async translateText(text: string, targetLanguage: string): Promise<string> {
    const [translation] = await this.translate.translate(text, targetLanguage);
    return translation || '';
  }
}
