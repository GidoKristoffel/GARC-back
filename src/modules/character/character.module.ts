import { Module } from '@nestjs/common';
import { CharacterController } from './controllers/character/character.controller';
import { CharacterService } from './services/character/character.service';

@Module({
  controllers: [CharacterController],
  providers: [CharacterService],
})
export class CharacterModule {}
