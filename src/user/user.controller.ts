import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  UseInterceptors
} from '@nestjs/common';
import { UserService } from '@user/user.service';
import { UserResponse } from '@user/responses';
import { CurrentUser } from '@common/decorators';
import { JwtPayload } from '@auth/interfaces';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':idOrEmail')
  async findOneUser(
    @Param('idOrEmail') idOrEmail: string,
  ): Promise<UserResponse> {
    const user = await this.userService.findOne(idOrEmail);
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
