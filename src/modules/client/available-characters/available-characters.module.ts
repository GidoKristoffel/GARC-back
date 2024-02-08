import { Module } from '@nestjs/common';
import { AvailableCharactersController } from './controllers/available-characters/available-characters.controller';
import { AvailableCharactersService } from './services/available-characters/available-characters.service';

@Module({
  controllers: [AvailableCharactersController],
  providers: [AvailableCharactersService]
})
export class AvailableCharactersModule {}
