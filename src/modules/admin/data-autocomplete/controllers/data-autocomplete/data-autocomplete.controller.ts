import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { DataAutocompleteService } from '../../services/data-autocomplete/data-autocomplete.service';
import { Page } from '@gonetone/hoyowiki-api/dist/interfaces/EntryPageDataNpcAPIInterface';

@Controller('data-autocomplete')
export class DataAutocompleteController {
  constructor(private dataAutocompleteService: DataAutocompleteService) {}

  // @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  getCharacters(@Param('id') id: string): Promise<Page> {
    return this.dataAutocompleteService.getCharacterById(id);
  }
}
