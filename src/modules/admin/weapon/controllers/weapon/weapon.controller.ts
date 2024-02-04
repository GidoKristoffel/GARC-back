import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { WeaponService } from '../../services/weapon/weapon.service';
import {
  IAllWeaponsResponse,
  ICreatedWeaponResponse,
  IDeletedWeaponResponse,
  IUpdatedWeaponResponse,
  IWeaponResponse,
} from '../../interfaces/response.interface';
import { IDeletedWeapon, IWeapon } from '../../interfaces/common.interface';
import { WeaponDto } from '../../dto';

@Controller('admin/weapon')
export class WeaponController {
  constructor(private weaponService: WeaponService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getAllWeapons(): Promise<IAllWeaponsResponse> {
    const weapons: IWeapon[] | null = await this.weaponService.findAll();
    return {
      weapons,
      status: weapons ? HttpStatus.FOUND : HttpStatus.NOT_FOUND,
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async findOneWeapon(@Param('id') id: string): Promise<IWeaponResponse> {
    const weapon: IWeapon | null = await this.weaponService.findOne(id);
    return {
      weapon,
      status: weapon ? HttpStatus.FOUND : HttpStatus.NOT_FOUND,
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async createWeapon(
    @Body() dto: WeaponDto,
  ): Promise<ICreatedWeaponResponse | void> {
    const weapon: IWeapon | null = await this.weaponService.create(dto);
    return {
      weapon,
      status: weapon ? HttpStatus.CREATED : HttpStatus.BAD_REQUEST,
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch(':id')
  async updateWeapon(
    @Param('id') id: string,
    @Body() dto: WeaponDto,
  ): Promise<IUpdatedWeaponResponse> {
    const weapon: IWeapon | null = await this.weaponService.update(id, dto);
    return {
      weapon,
      status: weapon ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  async deleteCharacter(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<IDeletedWeaponResponse> {
    const weapon: IDeletedWeapon = await this.weaponService.delete(id);
    return {
      weapon,
      status: weapon ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
    };
  }
}
