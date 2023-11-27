import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../../../user/services/user/user.service';
import { LoginDto, RegisterDto } from '../../dto';
import { Tokens } from '../../interfaces/auth.interface';
import { Provider, Role, User } from '@prisma/client';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../../prisma/prisma.service';
import { v4 } from 'uuid';
import { add } from 'date-fns';
import { SuperUserService } from "../super-user/super-user.service";

@Injectable()
export class AuthService {
  private readonly logger: Logger = new Logger(AuthService.name);
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly superUserService: SuperUserService,
  ) {}

  async register(dto: RegisterDto, role: Role): Promise<any> {
    const user: User = await this.userService
      .findOne(dto.email, role)
      .catch((err): null => {
        this.logger.error(err);
        return null;
      });

    if (user) {
      throw new ConflictException(
        `A ${
          role === Role.USER ? 'user' : 'admin'
        } with this email is already registered`,
      );
    }

    return this.userService.save(dto, role).catch((err) => {
      this.logger.error(err);
      return null;
    });
  }

  async login(dto: LoginDto, role: Role, agent: string): Promise<Tokens> {
    if (this.superUserService.isSuperUser(dto.email, dto.password)) {
      const user: User = this.superUserService.getSuperUser();
      return this.generateTokens(user, agent);
    } else {
      const user: User = await this.userService
        .findOne(dto.email, role, true)
        .catch((err): null => {
          this.logger.error(err);
          return null;
        });

      if (!user || !compareSync(dto.password, user.password)) {
        throw new UnauthorizedException('Wrong login or password');
      }

      return this.generateTokens(user, agent);
    }
  }

  private async generateTokens(user: User, agent: string): Promise<Tokens> {
    const accessToken: string =
      'Bearer ' +
      this.jwtService.sign({
        id: user.id,
        email: user.email,
        roles: user.roles,
      });

    const refreshToken = await this.getRefreshToken(user.id, agent);
    return { accessToken, refreshToken };
  }

  private async getRefreshToken(userId: string, agent: string) {
    const _token = await this.prismaService.token.findFirst({
      where: {
        userId,
        userAgent: agent,
      },
    });
    const token: string = _token?.token ?? '';
    return this.prismaService.token.upsert({
      where: { token },
      update: {
        token: v4(),
        exp: add(new Date(), { months: 1 }),
      },
      create: {
        token: v4(),
        exp: add(new Date(), { months: 1 }),
        userId,
        userAgent: agent,
      },
    });
  }

  async refreshTokens(
    refreshToken: string,
    role: Role,
    agent: string,
  ): Promise<Tokens> {
    const token = await this.prismaService.token.findUnique({
      where: { token: refreshToken },
    });
    if (!token) {
      throw new UnauthorizedException();
    }
    await this.prismaService.token.delete({ where: { token: refreshToken } });
    if (new Date(token.exp) < new Date()) {
      throw new UnauthorizedException();
    }
    const user = await this.userService.findOne(token.userId, role);
    return this.generateTokens(user, agent);
  }

  public async providerAuth(
    email: string,
    role: Role,
    agent: string,
    provider: Provider,
  ): Promise<Tokens> {
    const userExist = await this.userService.findOne(email, role);
    if (userExist) {
      return this.generateTokens(userExist, agent);
    }
    const user = await this.userService
      .save({ email, provider: provider }, role)
      .catch((err): null => {
        this.logger.error(err);
        return null;
      });
    if (!user) {
      throw new HttpException(
        `Failed to create user with email ${email} in Google auth`,
        HttpStatus.REQUEST_TIMEOUT,
      );
    }
    return this.generateTokens(user, agent);
  }
}
