import { ArgsType, Field, InputType } from '@nestjs/graphql';
import {
  CreateManyInvestmentGoalArgs as GeneratedCreateManyInvestmentGoalArgs,
  InvestmentGoalCreateManyInput,
} from '@Prisma/index';

@ArgsType()
export class CreateManyInvestmentGoalArgs extends GeneratedCreateManyInvestmentGoalArgs {}

@InputType()
export class CreateManyInvestmentGoalInput
  implements CreateManyInvestmentGoalArgs
{
  @Field(() => [InvestmentGoalCreateManyInput], { nullable: false })
  data!: Array<InvestmentGoalCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
