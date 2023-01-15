import { ArgsType, Field } from '@nestjs/graphql';
import { UpdateOneInvestmentGoalInput } from './update-one.args';

@ArgsType()
export class UpdateManyInvestmentGoalArgs {
  @Field(() => [UpdateOneInvestmentGoalInput], { nullable: false })
  updateMany: UpdateOneInvestmentGoalInput[];
}
