import { ArgsType, Field, InputType } from '@nestjs/graphql';
import {
  InvestmentGoalUpdateInput,
  InvestmentGoalWhereUniqueInput,
  UpdateOneInvestmentGoalArgs as GeneratedUpdateOneInvestmentGoalArgs,
} from '@Prisma/index';

@ArgsType()
export class UpdateOneInvestmentGoalArgs extends GeneratedUpdateOneInvestmentGoalArgs {}

@InputType()
export class UpdateOneInvestmentGoalInput
  implements UpdateOneInvestmentGoalArgs
{
  @Field(() => InvestmentGoalUpdateInput, { nullable: false })
  data!: InvestmentGoalUpdateInput;

  @Field(() => InvestmentGoalWhereUniqueInput, { nullable: false })
  where!: InvestmentGoalWhereUniqueInput;
}
