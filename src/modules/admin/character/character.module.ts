import { Module } from '@nestjs/common';
import { CharacterController } from './controllers/character/character.controller';
import { CharacterService } from './services/character/character.service';
import { TransformCharacterService } from './services/transform-character/transform-character.service';
import { CharacterAutocompleteService } from './services/character-autocomplete/character-autocomplete.service';
import { GoogleTranslateService } from '../../../core/services/google-translate/google-translate.service';

@Module({
  controllers: [CharacterController],
  providers: [
    CharacterService,
    TransformCharacterService,
    CharacterAutocompleteService,
    GoogleTranslateService,
  ],
})
export class CharacterModule {}
