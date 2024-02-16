import { Injectable } from '@nestjs/common';
import { GoogleTranslator } from '@translate-tools/core/translators/GoogleTranslator';

@Injectable()
export class GoogleTranslateService {
  private readonly translator: GoogleTranslator = new GoogleTranslator();

  async get(text: string, from: string, to: string): Promise<string> {
    return (
      this.translator
        .translate(text, from, to)
        .then((translate: string) => translate) || ''
    );
  }
}
