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
import { AscensionMaterialService } from '../../services/ascension-material/ascension-material.service';
import {
  IAllAscensionMaterialsResponse,
  IAscensionMaterialResponse,
  ICreatedAscensionMaterialResponse,
  IDeletedAscensionMaterialResponse,
  IUpdatedAscensionMaterialResponse,
} from '../../interfaces/response.interface';
import {
  IAscensionMaterial,
  IDeletedAscensionMaterial,
} from '../../interfaces/common.interface';
import { AscensionMaterialDto } from '../../dto';

@Controller('admin/ascension-material')
export class AscensionMaterialController {
  constructor(private ascensionMaterialService: AscensionMaterialService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getAllAscensionMaterials(): Promise<IAllAscensionMaterialsResponse> {
    const ascensionMaterials: IAscensionMaterial[] | null =
      await this.ascensionMaterialService.findAll();
    return {
      ascensionMaterials,
      status: ascensionMaterials ? HttpStatus.FOUND : HttpStatus.NOT_FOUND,
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async findOneAscensionMaterial(
    @Param('id') id: string,
  ): Promise<IAscensionMaterialResponse> {
    const ascensionMaterial: IAscensionMaterial | null =
      await this.ascensionMaterialService.findOne(id);
    return {
      ascensionMaterial,
      status: ascensionMaterial ? HttpStatus.FOUND : HttpStatus.NOT_FOUND,
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async createAscensionMaterial(
    @Body() dto: AscensionMaterialDto,
  ): Promise<ICreatedAscensionMaterialResponse | void> {
    const ascensionMaterial: IAscensionMaterial | null =
      await this.ascensionMaterialService.create(dto);
    return {
      ascensionMaterial,
      status: ascensionMaterial ? HttpStatus.CREATED : HttpStatus.BAD_REQUEST,
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch(':id')
  async updateAscensionMaterial(
    @Param('id') id: string,
    @Body() dto: AscensionMaterialDto,
  ): Promise<IUpdatedAscensionMaterialResponse> {
    const ascensionMaterial: IAscensionMaterial | null =
      await this.ascensionMaterialService.update(id, dto);
    return {
      ascensionMaterial,
      status: ascensionMaterial ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  async deleteCharacter(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<IDeletedAscensionMaterialResponse> {
    const ascensionMaterial: IDeletedAscensionMaterial =
      await this.ascensionMaterialService.delete(id);
    return {
      ascensionMaterial,
      status: ascensionMaterial ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
    };
  }
}
