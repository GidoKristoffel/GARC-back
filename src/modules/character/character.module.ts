import { Module } from '@nestjs/common';
import { CharacterController } from './controllers/character/character.controller';

@Module({
  controllers: [CharacterController],
})
export class CharacterModule {}
