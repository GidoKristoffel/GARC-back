import { Module } from '@nestjs/common';
import { DataAutocompleteService } from './services/data-autocomplete/data-autocomplete.service';
import { DataAutocompleteController } from './controllers/data-autocomplete/data-autocomplete.controller';

@Module({
  providers: [DataAutocompleteService],
  controllers: [DataAutocompleteController]
})
export class DataAutocompleteModule {}
