import { Module } from '@nestjs/common';
import { DataAutocompleteService } from './services/data-autocomplete/data-autocomplete.service';
import { DataAutocompleteController } from './controllers/data-autocomplete/data-autocomplete.controller';
import { GoogleTranslateService } from '../../../core/services/google-translate/google-translate.service';

@Module({
  providers: [DataAutocompleteService, GoogleTranslateService],
  controllers: [DataAutocompleteController],
})
export class DataAutocompleteModule {}
