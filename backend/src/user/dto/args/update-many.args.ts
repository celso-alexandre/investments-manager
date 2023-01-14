import { ArgsType, Field } from '@nestjs/graphql';
import { UpdateOneUserInput } from './update-one.args';

@ArgsType()
export class UpdateManyUserArgs {
  @Field(() => [UpdateOneUserInput], { nullable: false })
  updateMany: UpdateOneUserInput[];
}
