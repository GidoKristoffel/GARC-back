import { Injectable } from '@nestjs/common';
import { Role, User } from '@prisma/client';

@Injectable()
export class SuperUserService {
  readonly email: string = 'super.user@test.test';
  readonly password: string = 'superuser';
  readonly user: User = {
    id: '0',
    email: this.email,
    username: 'superuser',
    password: this.password,
    provider: null,
    createdAt: new Date(2000, 10, 10),
    updatedAt: new Date(2000, 10, 10),
    roles: [Role.ADMIN],
  };

  public isSuperUser(email: string, password: string): boolean {
    return email === this.email && password === this.password;
  }

  public getSuperUser(): User {
    return this.user;
  }
}
