import type { PrismaClient } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import {
  CreateManyInvestmentGoalArgs,
  CreateOneInvestmentGoalArgs,
  DeleteOneInvestmentGoalArgs,
  FindManyInvestmentGoalArgs,
  FindUniqueInvestmentGoalArgs,
  UpdateManyInvestmentGoalArgs,
  UpdateOneInvestmentGoalArgs,
  CreateUpdateManyInvestmentGoalArgs,
  ProjectInvestmentGoalArgs,
} from './dto';
import dayjs from 'dayjs';

@Injectable()
export class InvestmentGoalService {
  constructor(private readonly prisma: PrismaService) {}

  findUnique(
    args: FindUniqueInvestmentGoalArgs,
    prisma: Partial<PrismaClient> = this.prisma,
  ) {
    return prisma.investmentGoal.findUniqueOrThrow(args);
  }

  findMany(
    args: FindManyInvestmentGoalArgs,
    prisma: Partial<PrismaClient> = this.prisma,
  ) {
    return prisma.investmentGoal.findMany(args);
  }

  createOne(
    args: CreateOneInvestmentGoalArgs,
    prisma: Partial<PrismaClient> = this.prisma,
  ) {
    return prisma.investmentGoal.create(args);
  }

  async createMany(
    args: CreateManyInvestmentGoalArgs,
    prisma: Partial<PrismaClient> = this.prisma,
  ) {
    await prisma.investmentGoal.createMany(args);
    return true;
  }

  updateOne(
    args: UpdateOneInvestmentGoalArgs,
    prisma: Partial<PrismaClient> = this.prisma,
  ) {
    return prisma.investmentGoal.update(args);
  }

  async updateMany(
    args: UpdateManyInvestmentGoalArgs,
    prisma?: Partial<PrismaClient>,
  ) {
    const logicFn = async (_prisma: Partial<PrismaClient>) => {
      return Promise.all(
        args.updateMany.map((arg) => _prisma.investmentGoal.update(arg)),
      );
    };
    if (prisma) return logicFn(prisma);
    return this.prisma.$transaction(logicFn);
  }

  deleteOne(
    args: DeleteOneInvestmentGoalArgs,
    prisma: Partial<PrismaClient> = this.prisma,
  ) {
    return prisma.investmentGoal.delete(args);
  }

  async createUpdate(
    args: CreateUpdateManyInvestmentGoalArgs,
    prisma: Partial<PrismaClient> = this.prisma,
  ): Promise<boolean> {
    const willNotCreate = !args.createMany?.data?.length;
    const willNotUpdate = !args.updateMany?.updateMany;
    const logicFn = async (_prisma: Partial<PrismaClient>) => {
      return Promise.all([
        ...(willNotCreate ? [] : [this.createMany(args.createMany, _prisma)]),
        ...(willNotUpdate ? [] : [this.updateMany(args.updateMany, _prisma)]),
      ]);
    };
    if (prisma) await logicFn(prisma);
    else await prisma.$transaction(logicFn);
    return true;
  }

  async project({ dayInterval, where }: ProjectInvestmentGoalArgs) {
    const goals = await this.prisma.investmentGoal.findMany({ where });
    const projection = await Promise.all(
      goals.map(async (goal) => {
        const { investmentPlanId, monthlyApportValue, rentabilityTax, value } =
          goal;
        const { date } = await this.prisma.investmentPlan.findUnique({
          where: { id: investmentPlanId },
        });
        let accumulatedValue = 0;
        let day = dayjs(date).startOf('month');
        const details: {
          day: Date;
          accumulatedValue: number;
          profitValue: number;
        }[] = [];
        while (accumulatedValue < value) {
          const isYearly = dayInterval === 'yearly';
          const tax = rentabilityTax / 12 / 100;
          const accumulatedWithoutTax = accumulatedValue + monthlyApportValue;
          accumulatedValue = accumulatedWithoutTax * (1 + tax);

          const profitValue = accumulatedValue - accumulatedWithoutTax;
          details.push({
            day: day.toDate(),
            accumulatedValue,
            profitValue,
          });
          day = day.add(1, isYearly ? 'year' : 'month');
        }
      }),
    );
  }
}
