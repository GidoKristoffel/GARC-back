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
import { WeaponMaterialService } from '../../services/weapon-material/weapon-material.service';
import {
  IAllWeaponMaterialsResponse,
  ICreatedWeaponMaterialResponse,
  IDeletedWeaponMaterialResponse,
  IUpdatedWeaponMaterialResponse,
  IWeaponMaterialResponse,
} from '../../interfaces/response.interface';
import {
  IDeletedWeaponMaterial,
  IWeaponMaterial,
} from '../../interfaces/common.interface';
import { WeaponMaterialDto } from '../../dto';

@Controller('admin/weapon-material')
export class WeaponMaterialController {
  constructor(private weaponMaterialService: WeaponMaterialService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getAllWeaponMaterials(): Promise<IAllWeaponMaterialsResponse> {
    const weaponMaterials: IWeaponMaterial[] | null =
      await this.weaponMaterialService.findAll();
    return {
      weaponMaterials,
      status: weaponMaterials ? HttpStatus.FOUND : HttpStatus.NOT_FOUND,
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async findOneWeaponMaterial(
    @Param('id') id: string,
  ): Promise<IWeaponMaterialResponse> {
    const weaponMaterial: IWeaponMaterial | null =
      await this.weaponMaterialService.findOne(id);
    return {
      weaponMaterial,
      status: weaponMaterial ? HttpStatus.FOUND : HttpStatus.NOT_FOUND,
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async createWeaponMaterial(
    @Body() dto: WeaponMaterialDto,
  ): Promise<ICreatedWeaponMaterialResponse | void> {
    const weaponMaterial: IWeaponMaterial | null =
      await this.weaponMaterialService.create(dto);
    return {
      weaponMaterial,
      status: weaponMaterial ? HttpStatus.CREATED : HttpStatus.BAD_REQUEST,
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch(':id')
  async updateWeaponMaterial(
    @Param('id') id: string,
    @Body() dto: WeaponMaterialDto,
  ): Promise<IUpdatedWeaponMaterialResponse> {
    const weaponMaterial: IWeaponMaterial | null =
      await this.weaponMaterialService.update(id, dto);
    return {
      weaponMaterial,
      status: weaponMaterial ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  async deleteCharacter(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<IDeletedWeaponMaterialResponse> {
    const weaponMaterial: IDeletedWeaponMaterial =
      await this.weaponMaterialService.delete(id);
    return {
      weaponMaterial,
      status: weaponMaterial ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
    };
  }
}
