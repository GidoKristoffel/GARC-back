import { IUser } from './user.interface';
import { ICharacter } from '../../modules/admin/character/interfaces/common.interface';

export interface IUserCharacters {
  user: IUser;
  userId: string;
  character: ICharacter;
  characterId: string;
}
