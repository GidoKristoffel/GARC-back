import { Module } from '@nestjs/common';
import { CharacterController } from './controllers/character/character.controller';
import { CharacterService } from './services/character/character.service';
import { TransformCharacterService } from './services/transform-character/transform-character.service';
import { CharacterAutocompleteService } from './services/character-autocomplete/character-autocomplete.service';

@Module({
  controllers: [CharacterController],
  providers: [CharacterService, TransformCharacterService, CharacterAutocompleteService],
})
export class CharacterModule {}
