import { Module } from '@nestjs/common';
import { AvailableCharactersController } from './controllers/available-characters/available-characters.controller';

@Module({
  controllers: [AvailableCharactersController]
})
export class AvailableCharactersModule {}
