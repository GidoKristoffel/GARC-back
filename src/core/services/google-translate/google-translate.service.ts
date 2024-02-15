import { Injectable } from '@nestjs/common';
import { GoogleTranslator } from '@translate-tools/core/esm/translators/GoogleTranslator';

// // eslint-disable-next-line @typescript-eslint/no-var-requires
// const translate = require('google-translate-api');

@Injectable()
export class GoogleTranslateService {
  private readonly translator = new GoogleTranslator();

  async translateText(text: string, from: string, to: string): Promise<string> {
    console.log('text: ', text);
    console.log('from: ', from);
    console.log('to: ', to);
    console.log('----------------------------');
    return (
      this.translator
        .translate(text, from, to)
        .then((translate: string) => translate) || ''
    );
  }
}
