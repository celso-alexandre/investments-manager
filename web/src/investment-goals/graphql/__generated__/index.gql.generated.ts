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

export type CreateInvestmentGoalsMutationVariables = Types.Exact<{
  data: Array<Types.InvestmentGoalCreateManyInput> | Types.InvestmentGoalCreateManyInput;
}>;


export type CreateInvestmentGoalsMutation = { __typename?: 'Mutation', createInvestmentGoals: boolean };

export type UpdateInvestmentGoalsMutationVariables = Types.Exact<{
  updateMany: Array<Types.UpdateOneInvestmentGoalInput> | Types.UpdateOneInvestmentGoalInput;
}>;


export type UpdateInvestmentGoalsMutation = { __typename?: 'Mutation', updateInvestmentGoals: Array<{ __typename?: 'InvestmentGoal', id: string, type: Types.GoalType, level: Types.GoalLevel, monthlyApportValue: number, rentabilityTax: number, value: number }> };


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
export const CreateInvestmentGoalsDocument = gql`
    mutation CreateInvestmentGoals($data: [InvestmentGoalCreateManyInput!]!) {
  createInvestmentGoals(data: $data)
}
    `;
export type CreateInvestmentGoalsMutationFn = Apollo.MutationFunction<CreateInvestmentGoalsMutation, CreateInvestmentGoalsMutationVariables>;

/**
 * __useCreateInvestmentGoalsMutation__
 *
 * To run a mutation, you first call `useCreateInvestmentGoalsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateInvestmentGoalsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createInvestmentGoalsMutation, { data, loading, error }] = useCreateInvestmentGoalsMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateInvestmentGoalsMutation(baseOptions?: Apollo.MutationHookOptions<CreateInvestmentGoalsMutation, CreateInvestmentGoalsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateInvestmentGoalsMutation, CreateInvestmentGoalsMutationVariables>(CreateInvestmentGoalsDocument, options);
      }
export type CreateInvestmentGoalsMutationHookResult = ReturnType<typeof useCreateInvestmentGoalsMutation>;
export type CreateInvestmentGoalsMutationResult = Apollo.MutationResult<CreateInvestmentGoalsMutation>;
export type CreateInvestmentGoalsMutationOptions = Apollo.BaseMutationOptions<CreateInvestmentGoalsMutation, CreateInvestmentGoalsMutationVariables>;
export const UpdateInvestmentGoalsDocument = gql`
    mutation UpdateInvestmentGoals($updateMany: [UpdateOneInvestmentGoalInput!]!) {
  updateInvestmentGoals(updateMany: $updateMany) {
    id
    type
    level
    monthlyApportValue
    rentabilityTax
    value
  }
}
    `;
export type UpdateInvestmentGoalsMutationFn = Apollo.MutationFunction<UpdateInvestmentGoalsMutation, UpdateInvestmentGoalsMutationVariables>;

/**
 * __useUpdateInvestmentGoalsMutation__
 *
 * To run a mutation, you first call `useUpdateInvestmentGoalsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateInvestmentGoalsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateInvestmentGoalsMutation, { data, loading, error }] = useUpdateInvestmentGoalsMutation({
 *   variables: {
 *      updateMany: // value for 'updateMany'
 *   },
 * });
 */
export function useUpdateInvestmentGoalsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateInvestmentGoalsMutation, UpdateInvestmentGoalsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateInvestmentGoalsMutation, UpdateInvestmentGoalsMutationVariables>(UpdateInvestmentGoalsDocument, options);
      }
export type UpdateInvestmentGoalsMutationHookResult = ReturnType<typeof useUpdateInvestmentGoalsMutation>;
export type UpdateInvestmentGoalsMutationResult = Apollo.MutationResult<UpdateInvestmentGoalsMutation>;
export type UpdateInvestmentGoalsMutationOptions = Apollo.BaseMutationOptions<UpdateInvestmentGoalsMutation, UpdateInvestmentGoalsMutationVariables>;