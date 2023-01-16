import { Field, ArgsType } from '@nestjs/graphql';
import { InvestmentGoalWhereInput } from '@Prisma/index';

enum MontlyOrYearly {
  monthly = 'monthly',
  yearly = 'yearly',
}

@ArgsType()
export class ProjectInvestmentGoalArgs {
  @Field(() => InvestmentGoalWhereInput, { nullable: true })
  where?: InvestmentGoalWhereInput;

  @Field(() => MontlyOrYearly, { defaultValue: MontlyOrYearly.yearly })
  dayInterval!: keyof typeof MontlyOrYearly;
}
