import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import {
  CreateManyInvestmentGoalArgs,
  CreateOneInvestmentGoalArgs,
  DeleteManyInvestmentGoalArgs,
  DeleteOneInvestmentGoalArgs,
  FindManyInvestmentGoalArgs,
  FindUniqueInvestmentGoalArgs,
  UpdateManyInvestmentGoalArgs,
  UpdateOneInvestmentGoalArgs,
} from './dto';

@Injectable()
export class InvestmentGoalService {
  constructor(private readonly prisma: PrismaService) {}

  findUnique(args: FindUniqueInvestmentGoalArgs) {
    return this.prisma.investmentGoal.findUniqueOrThrow(args);
  }

  findMany(args: FindManyInvestmentGoalArgs) {
    return this.prisma.investmentGoal.findMany(args);
  }

  createOne(args: CreateOneInvestmentGoalArgs) {
    return this.prisma.investmentGoal.create(args);
  }

  async createMany(args: CreateManyInvestmentGoalArgs) {
    await this.prisma.investmentGoal.createMany(args);
    return true;
  }

  updateOne(args: UpdateOneInvestmentGoalArgs) {
    return this.prisma.investmentGoal.update(args);
  }

  updateMany(args: UpdateManyInvestmentGoalArgs) {
    return Promise.all(
      args.updateMany.map((arg) => this.prisma.investmentGoal.update(arg)),
    );
  }

  deleteOne(args: DeleteOneInvestmentGoalArgs) {
    return this.prisma.investmentGoal.delete(args);
  }

  async deleteMany(args: DeleteManyInvestmentGoalArgs) {
    await this.prisma.investmentGoal.deleteMany(args);
    return true;
  }
}
