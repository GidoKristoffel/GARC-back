import { Controller, Get, Param } from '@nestjs/common';
import { DataAutocompleteService } from '../../services/data-autocomplete/data-autocomplete.service';
import { ICharacterCreate } from '../../../character/interfaces/common.interface';

@Controller('data-autocomplete')
export class DataAutocompleteController {
  constructor(private dataAutocompleteService: DataAutocompleteService) {}

  // @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  getCharacters(@Param('id') id: string): Promise<ICharacterCreate> {
    return this.dataAutocompleteService.getCharacterById(id);
  }
}
