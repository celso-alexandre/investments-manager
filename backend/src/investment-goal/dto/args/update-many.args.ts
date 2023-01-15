import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { UpdateOneInvestmentGoalInput } from './update-one.args';

@ArgsType()
export class UpdateManyInvestmentGoalArgs {
  @Field(() => [UpdateOneInvestmentGoalInput], { nullable: false })
  updateMany: UpdateOneInvestmentGoalInput[];
}

@InputType()
export class UpdateManyInvestmentGoalInput
  implements UpdateManyInvestmentGoalArgs
{
  @Field(() => [UpdateOneInvestmentGoalInput], { nullable: false })
  updateMany: UpdateOneInvestmentGoalInput[];
}
