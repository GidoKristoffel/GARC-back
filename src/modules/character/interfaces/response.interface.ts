import { HttpStatus } from '@nestjs/common';
import { Character } from '@prisma/client';

export interface ICharacterResponse {
  character: Character | null;
  status: HttpStatus.FOUND | HttpStatus.NOT_FOUND;
}
