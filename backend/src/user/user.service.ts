import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import {
  CreateManyUserArgs,
  CreateOneUserArgs,
  DeleteManyUserArgs,
  DeleteOneUserArgs,
  FindManyUserArgs,
  FindUniqueUserArgs,
  UpdateManyUserArgs,
  UpdateOneUserArgs,
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

  updateOne(args: UpdateOneUserArgs) {
    return this.prisma.user.update(args);
  }

  updateMany(args: UpdateManyUserArgs) {
    return Promise.all(
      args.updateMany.map((arg) => this.prisma.user.update(arg)),
    );
  }

  deleteOne(args: DeleteOneUserArgs) {
    return this.prisma.user.delete(args);
  }

  async deleteMany(args: DeleteManyUserArgs) {
    await this.prisma.user.deleteMany(args);
    return true;
  }
}
