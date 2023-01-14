import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { FindUniqueUserArgs } from './dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  findUnique(args: FindUniqueUserArgs) {
    return this.prisma.user.findUniqueOrThrow(args);
  }
}
