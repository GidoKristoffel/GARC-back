import { IUserCharacters } from './user-characters.interface';
import { ERole } from '../enums/role.enum';
import { EProvider } from '../enums/provider.enum';
import { IToken } from './token.interface';

export interface IUser {
  id: string;
  email: string;
  username: string;
  password?: string | null;
  provider?: EProvider;
  createdAt: Date;
  updatedAt: Date;
  roles: ERole[];
  Token: IToken[];
  UserCharacters: IUserCharacters[];
}
