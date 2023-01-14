import { Form, Input, Row, Typography } from 'antd';
import { useMemo } from 'react';
import { groupBy } from 'lodash';
import type * as Types from '../types';
import { GoalLevel } from '../types';
import {
  useCreateInvestmentGoalsMutation,
  useInvestmentGoalsQuery,
  useUpdateInvestmentGoalsMutation,
} from './graphql/__generated__/index.gql.generated';

type FormValues = Types.InvestmentGoalCreateInput & { id?: number };
export function InvestmentGoals() {
  const { data, loading } = useInvestmentGoalsQuery({ fetchPolicy: 'cache-and-network' });
  const [update, { loading: loadingUpdate }] = useUpdateInvestmentGoalsMutation();
  const [create, { loading: loadingCreate }] = useCreateInvestmentGoalsMutation();
  function onSubmit({ id, ...data }: FormValues) {
    if (id) {
      return update({
        variables: {
          updateMany: {
            where: { id },
            data: Object.entries(data).reduce((prev, [key, value]) => {
              return {
                ...prev,
                [key]: { set: value },
              };
            }, {} as Types.InvestmentGoalUpdateInput),
          },
        },
      });
    }

    return create({
      variables: {
        data,
      },
    });
  }

  // eslint-disable-next-line no-unused-vars
  type InitialValues = { [key in GoalLevel]: FormValues };
  const defaultValues = useMemo<InitialValues>(() => {
    const defaultValue: InitialValues = {
      optimist: {} as any,
      pessimist: {} as any,
      realist: {} as any,
    };
    const groupped = groupBy(data?.investmentGoals, x => x.level) as unknown as InitialValues;
    return { ...defaultValue, ...groupped };
  }, [data]);
  console.log('data', data, loading);
  console.log('defaultValues', defaultValues);

  return (
    <>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Typography.Title level={2}>Investment Goals</Typography.Title>
      </div>
      <div style={{ margin: '0px 57px' }}>
        <Row gutter={[30, 30]} wrap={false} justify="start">
          {/* Type / Level / Monthly apport value / Goal value / Rentability tax */}
          {JSON.stringify(defaultValues ?? { null: true })}
          {Object.entries(defaultValues).map(([level, initialValue]) => {
            return (
              <Row key={level}>
                <Form initialValues={initialValue} onFinish={onSubmit}>
                  <Form.Item name={nameof<FormValues>(o => o.type)}>
                    <Input />
                  </Form.Item>
                </Form>
              </Row>
            );
          })}
        </Row>
      </div>
    </>
  );
}
