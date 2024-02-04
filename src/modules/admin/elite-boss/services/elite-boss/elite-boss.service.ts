import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../shared/prisma/prisma.service';
import { TransformEliteBossService } from '../transform-elite-boss/transform-elite-boss.service';
import { EliteBoss } from '@prisma/client';
import {
  IDeletedEliteBoss,
  IEliteBoss,
} from '../../interfaces/common.interface';
import { EliteBossDto } from '../../dto';

@Injectable()
export class EliteBossService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly transformEliteBossService: TransformEliteBossService,
  ) {}

  public async findOne(id: string): Promise<IEliteBoss | null> {
    return this.prismaService.eliteBoss
      .findFirst({
        where: {
          id,
        },
      })
      .then((eliteBoss: EliteBoss) =>
        this.transformEliteBossService.transformToResponseFormat(eliteBoss),
      )
      .catch(() => null);
  }

  public async findAll(): Promise<IEliteBoss[] | null> {
    return this.prismaService.eliteBoss
      .findMany()
      .then((eliteBosses: EliteBoss[]) => {
        return eliteBosses.map((eliteBoss: EliteBoss) =>
          this.transformEliteBossService.transformToResponseFormat(eliteBoss),
        );
      })
      .catch(() => null);
  }

  public async create(eliteBoss: EliteBossDto): Promise<IEliteBoss | null> {
    const createdEliteBoss: EliteBoss =
      await this.prismaService.eliteBoss.create({
        data: this.transformEliteBossService.transformToDBFormat(eliteBoss),
      });
    return this.transformEliteBossService.transformToResponseFormat(
      createdEliteBoss,
    );
  }

  public async update(
    id: string,
    eliteBoss: EliteBossDto,
  ): Promise<IEliteBoss | null> {
    const updatedEliteBoss: EliteBoss | null =
      await this.prismaService.eliteBoss.update({
        where: {
          id,
        },
        data: this.transformEliteBossService.transformToDBFormat(eliteBoss),
      });

    if (!updatedEliteBoss) {
      return null;
    }

    return this.transformEliteBossService.transformToResponseFormat(
      updatedEliteBoss,
    );
  }

  public async delete(id: string): Promise<IDeletedEliteBoss> {
    return this.prismaService.eliteBoss.delete({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });
  }
}
