import * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type InvestmentGoalsQueryVariables = Types.Exact<{
  orderBy?: Types.InputMaybe<Array<Types.InvestmentGoalOrderByWithRelationInput> | Types.InvestmentGoalOrderByWithRelationInput>;
  where?: Types.InputMaybe<Types.InvestmentGoalWhereInput>;
}>;


export type InvestmentGoalsQuery = { __typename?: 'Query', investmentGoals: Array<{ __typename?: 'InvestmentGoal', id: string, type: Types.GoalType, level: Types.GoalLevel, monthlyApportValue: number, rentabilityTax: number, value: number }> };

export type InvestmentGoalQueryVariables = Types.Exact<{
  where: Types.InvestmentGoalWhereUniqueInput;
}>;


export type InvestmentGoalQuery = { __typename?: 'Query', investmentGoal: { __typename?: 'InvestmentGoal', id: string, type: Types.GoalType, level: Types.GoalLevel, monthlyApportValue: number, rentabilityTax: number, value: number } };

export type CreateUpdateInvestmentGoalsMutationVariables = Types.Exact<{
  createMany?: Types.InputMaybe<Types.CreateManyInvestmentGoalInput>;
  updateMany?: Types.InputMaybe<Types.UpdateManyInvestmentGoalInput>;
}>;


export type CreateUpdateInvestmentGoalsMutation = { __typename?: 'Mutation', createUpdateInvestmentGoals: boolean };


export const InvestmentGoalsDocument = gql`
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

/**
 * __useInvestmentGoalsQuery__
 *
 * To run a query within a React component, call `useInvestmentGoalsQuery` and pass it any options that fit your needs.
 * When your component renders, `useInvestmentGoalsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInvestmentGoalsQuery({
 *   variables: {
 *      orderBy: // value for 'orderBy'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useInvestmentGoalsQuery(baseOptions?: Apollo.QueryHookOptions<InvestmentGoalsQuery, InvestmentGoalsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InvestmentGoalsQuery, InvestmentGoalsQueryVariables>(InvestmentGoalsDocument, options);
      }
export function useInvestmentGoalsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InvestmentGoalsQuery, InvestmentGoalsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InvestmentGoalsQuery, InvestmentGoalsQueryVariables>(InvestmentGoalsDocument, options);
        }
export type InvestmentGoalsQueryHookResult = ReturnType<typeof useInvestmentGoalsQuery>;
export type InvestmentGoalsLazyQueryHookResult = ReturnType<typeof useInvestmentGoalsLazyQuery>;
export type InvestmentGoalsQueryResult = Apollo.QueryResult<InvestmentGoalsQuery, InvestmentGoalsQueryVariables>;
export const InvestmentGoalDocument = gql`
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

/**
 * __useInvestmentGoalQuery__
 *
 * To run a query within a React component, call `useInvestmentGoalQuery` and pass it any options that fit your needs.
 * When your component renders, `useInvestmentGoalQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInvestmentGoalQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useInvestmentGoalQuery(baseOptions: Apollo.QueryHookOptions<InvestmentGoalQuery, InvestmentGoalQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InvestmentGoalQuery, InvestmentGoalQueryVariables>(InvestmentGoalDocument, options);
      }
export function useInvestmentGoalLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InvestmentGoalQuery, InvestmentGoalQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InvestmentGoalQuery, InvestmentGoalQueryVariables>(InvestmentGoalDocument, options);
        }
export type InvestmentGoalQueryHookResult = ReturnType<typeof useInvestmentGoalQuery>;
export type InvestmentGoalLazyQueryHookResult = ReturnType<typeof useInvestmentGoalLazyQuery>;
export type InvestmentGoalQueryResult = Apollo.QueryResult<InvestmentGoalQuery, InvestmentGoalQueryVariables>;
export const CreateUpdateInvestmentGoalsDocument = gql`
    mutation CreateUpdateInvestmentGoals($createMany: CreateManyInvestmentGoalInput, $updateMany: UpdateManyInvestmentGoalInput) {
  createUpdateInvestmentGoals(createMany: $createMany, updateMany: $updateMany)
}
    `;
export type CreateUpdateInvestmentGoalsMutationFn = Apollo.MutationFunction<CreateUpdateInvestmentGoalsMutation, CreateUpdateInvestmentGoalsMutationVariables>;

/**
 * __useCreateUpdateInvestmentGoalsMutation__
 *
 * To run a mutation, you first call `useCreateUpdateInvestmentGoalsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUpdateInvestmentGoalsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUpdateInvestmentGoalsMutation, { data, loading, error }] = useCreateUpdateInvestmentGoalsMutation({
 *   variables: {
 *      createMany: // value for 'createMany'
 *      updateMany: // value for 'updateMany'
 *   },
 * });
 */
export function useCreateUpdateInvestmentGoalsMutation(baseOptions?: Apollo.MutationHookOptions<CreateUpdateInvestmentGoalsMutation, CreateUpdateInvestmentGoalsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUpdateInvestmentGoalsMutation, CreateUpdateInvestmentGoalsMutationVariables>(CreateUpdateInvestmentGoalsDocument, options);
      }
export type CreateUpdateInvestmentGoalsMutationHookResult = ReturnType<typeof useCreateUpdateInvestmentGoalsMutation>;
export type CreateUpdateInvestmentGoalsMutationResult = Apollo.MutationResult<CreateUpdateInvestmentGoalsMutation>;
export type CreateUpdateInvestmentGoalsMutationOptions = Apollo.BaseMutationOptions<CreateUpdateInvestmentGoalsMutation, CreateUpdateInvestmentGoalsMutationVariables>;