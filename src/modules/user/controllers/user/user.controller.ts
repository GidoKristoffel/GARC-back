import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from '../../services/user/user.service';
import { UserResponse } from '../../responses';
import { CurrentUser } from '@common/decorators';
import { JwtPayload } from '../../../auth/interfaces/auth.interface';
import { Role, User } from "@prisma/client";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':idOrEmail')
  async findOneUser(
    @Param('idOrEmail') idOrEmail: string,
  ): Promise<UserResponse> {
    const user: User = await this.userService.findOne(idOrEmail, Role.USER);
    return new UserResponse(user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  async deleteUser(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: JwtPayload,
  ): Promise<{ id: string }> {
    return await this.userService.delete(id, user);
  }
}
