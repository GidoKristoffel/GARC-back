import { Module } from '@nestjs/common';
import { CharacterController } from './controllers/character/character.controller';
import { CharacterService } from './services/character/character.service';
import { TransformCharacterService } from './services/transform-character/transform-character.service';

@Module({
  controllers: [CharacterController],
  providers: [CharacterService, TransformCharacterService],
})
export class CharacterModule {}
