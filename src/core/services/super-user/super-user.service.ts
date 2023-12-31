import { Injectable } from '@nestjs/common';
import { Role, User } from '@prisma/client';
import { UserService } from '../../../modules/user/services/user/user.service';
import { RegisterDto } from '../../../modules/auth/dto';

@Injectable()
export class SuperUserService {
  readonly email: string = 'super.user@test.test';
  readonly password: string = 'superuser';
  readonly dto: RegisterDto = {
    username: 'Super User',
    email: 'super.user@test.test',
    password: 'superuser',
    passwordRepeat: 'superuser',
  };

  constructor(private readonly userService: UserService) {}

  public async init(): Promise<void> {
    const user: User | null = await this.userService.findOne(
      this.email,
      Role.ADMIN,
      true,
    );

    if (!user) {
      await this.userService.save(this.dto, Role.ADMIN);
    }
  }
}
