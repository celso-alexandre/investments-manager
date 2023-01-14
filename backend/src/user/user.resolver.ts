import { Resolver, Args, Query } from '@nestjs/graphql';
import { FindUniqueUserArgs } from './dto';
import { User } from './dto';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly service: UserService) {}

  @Query(() => User, { name: 'user' })
  findUnique(@Args() args: FindUniqueUserArgs) {
    return this.service.findUnique(args);
  }
}
