import { gql } from '@apollo/client';

gql`
  query InvestmentGoals($orderBy: [InvestmentGoalOrderByWithRelationInput!], $where: InvestmentGoalWhereInput) {
    investmentGoals(orderBy: $orderBy, where: $where) {
      id
      type
      level
      monthlyApportValue
      rentabilityTax
      value
    }
  }
`;

gql`
  query InvestmentGoal($where: InvestmentGoalWhereUniqueInput!) {
    investmentGoal(where: $where) {
      id
      type
      level
      monthlyApportValue
      rentabilityTax
      value
    }
  }
`;

gql`
  mutation CreateUpdateInvestmentGoals(
    $createMany: CreateManyInvestmentGoalInput
    $updateMany: UpdateManyInvestmentGoalInput
  ) {
    createUpdateInvestmentGoals(createMany: $createMany, updateMany: $updateMany)
  }
`;
