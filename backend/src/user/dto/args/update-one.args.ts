import { ArgsType, Field, InputType } from '@nestjs/graphql';
import {
  UpdateOneUserArgs as GeneratedUpdateOneUserArgs,
  UserUpdateInput,
  UserWhereUniqueInput,
} from '@Prisma/index';

@ArgsType()
export class UpdateOneUserArgs extends GeneratedUpdateOneUserArgs {}

@InputType()
export class UpdateOneUserInput implements UpdateOneUserArgs {
  @Field(() => UserUpdateInput, { nullable: false })
  data!: UserUpdateInput;

  @Field(() => UserWhereUniqueInput, { nullable: false })
  where!: UserWhereUniqueInput;
}
