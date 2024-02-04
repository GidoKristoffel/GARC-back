import { ICharacter } from '../../modules/character/interfaces/common.interface';
import { IUser } from './user.interface';

export interface IUserCharacters {
  user: IUser;
  userId: string;
  character: ICharacter;
  characterId: string;
}
