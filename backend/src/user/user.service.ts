import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import {
  CreateManyUserArgs,
  CreateOneUserArgs,
  DeleteManyUserArgs,
  DeleteOneUserArgs,
  FindManyUserArgs,
  FindUniqueUserArgs,
} from './dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  findUnique(args: FindUniqueUserArgs) {
    return this.prisma.user.findUniqueOrThrow(args);
  }

  findMany(args: FindManyUserArgs) {
    return this.prisma.user.findMany(args);
  }

  createOne(args: CreateOneUserArgs) {
    return this.prisma.user.create(args);
  }

  async createMany(args: CreateManyUserArgs) {
    await this.prisma.user.createMany(args);
    return true;
  }

  deleteOne(args: DeleteOneUserArgs) {
    return this.prisma.user.delete(args);
  }

  async deleteMany(args: DeleteManyUserArgs) {
    await this.prisma.user.deleteMany(args);
    return true;
  }
}