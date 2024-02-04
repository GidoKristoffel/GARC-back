import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { LoginDto, RegisterDto } from '../../dto';
import { Tokens } from '../../interfaces/auth.interface';

@Injectable()
export class BadRequestExceptionService {
  public registrationException(user: User, dto: RegisterDto): void {
    if (!user) {
      throw new BadRequestException(
        `Can't register user with data ${JSON.stringify(dto)}`,
      );
    }
  }

  public loginException(tokens: Tokens, dto: LoginDto): void {
    if (!tokens) {
      throw new BadRequestException(
        `Can't login with data ${JSON.stringify(dto)}`,
      );
    }
  }

  public refreshException(refreshToken: string): void {
    if (!refreshToken) {
      throw new UnauthorizedException();
    }
  }

  public refreshTokensException(tokens: Tokens): void {
    if (!tokens) {
      throw new UnauthorizedException();
    }
  }
}
