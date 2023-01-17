import { Field, ArgsType } from '@nestjs/graphql';
import { CreateManyInvestmentGoalInput } from './create-many.args';
import { UpdateManyInvestmentGoalInput } from './update-many.args';

@ArgsType()
export class CreateUpdateManyInvestmentGoalArgs {
  @Field(() => CreateManyInvestmentGoalInput, { nullable: true })
  createMany?: CreateManyInvestmentGoalInput;

  @Field(() => UpdateManyInvestmentGoalInput, { nullable: true })
  updateMany?: UpdateManyInvestmentGoalInput;
}
