import { Col, Form, InputNumber, Select, Skeleton, Typography } from 'antd';
import { useMemo } from 'react';
import type * as Types from '../types';
import { GoalLevel, GoalType } from '../types';
import {
  useCreateInvestmentGoalsMutation,
  useInvestmentGoalsQuery,
  useUpdateInvestmentGoalsMutation,
} from './graphql/__generated__/index.gql.generated';
import { formatCurrency, formatPercent } from '../helpers';

type FormValues = Types.InvestmentGoalCreateInput & { id?: string };
export function InvestmentGoals() {
  const [form] = Form.useForm();
  const { data, loading: loadingData } = useInvestmentGoalsQuery({ fetchPolicy: 'cache-and-network' });
  const [update, { loading: loadingUpdate }] = useUpdateInvestmentGoalsMutation();
  const [create, { loading: loadingCreate }] = useCreateInvestmentGoalsMutation();

  function onSubmit({ id, ...formData }: FormValues) {
    if (id) {
      return update({
        variables: {
          updateMany: {
            where: { id: +id },
            data: Object.entries(formData).reduce((prev, [key, value]) => {
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
        data: formData,
      },
    });
  }

  const isLoading = useMemo(
    () => loadingData || loadingCreate || loadingUpdate,
    [loadingData, loadingCreate, loadingUpdate]
  );

  // eslint-disable-next-line no-unused-vars
  type InitialValues = { [key in GoalLevel]: FormValues };
  const defaultValues = useMemo<InitialValues>(() => {
    const defVal: Pick<FormValues, 'type' | 'monthlyApportValue' | 'value'> = {
      type: GoalType.Value,
      monthlyApportValue: 0,
      value: 0,
    };
    return [GoalLevel.Pessimist, GoalLevel.Realist, GoalLevel.Optimist].reduce((prev, level, i) => {
      const found = data?.investmentGoals?.find(goal => goal.level === level);
      if (found) return { ...prev, [level]: found };
      const rentabilityTax = 9 + i * 2;
      const res: FormValues = { ...defVal, level, rentabilityTax };
      return { ...prev, [level]: res };
    }, {} as InitialValues);
  }, [data]);
  console.log('data', data, loadingData);
  console.log('defaultValues', defaultValues);

  if (isLoading) return <Skeleton />;

  return (
    <>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography.Title level={2}>Investment Goals</Typography.Title>
      </div>

      <div style={{ padding: '0px 30px' }}>
        <Form form={form} initialValues={defaultValues} onFinish={onSubmit} layout="inline" size="large">
          {Object.values([GoalLevel.Pessimist, GoalLevel.Realist, GoalLevel.Optimist]).map(level => {
            const initialValue = defaultValues[level];
            console.log('initialValue', initialValue);
            return (
              <>
                <Form.Item name={[level, nameof<FormValues>(o => o.id)]} hidden>
                  <InputNumber />
                </Form.Item>

                <Col span={4}>
                  <Form.Item name={[level, nameof<FormValues>(o => o.level)]} label="Level" labelCol={{ span: 24 }}>
                    <Select
                      style={{ width: '100%' }}
                      disabled
                      allowClear={false}
                      options={Object.entries(GoalLevel).map(([label, value]) => ({
                        label,
                        value,
                      }))}
                    />
                  </Form.Item>
                </Col>

                <Col span={4}>
                  <Form.Item name={[level, nameof<FormValues>(o => o.type)]} label="Type" labelCol={{ span: 24 }}>
                    <Select
                      style={{ width: '100%' }}
                      allowClear={false}
                      options={Object.entries(GoalType).map(([label, value]) => ({
                        label,
                        value,
                      }))}
                    />
                  </Form.Item>
                </Col>

                <Col span={6}>
                  <Form.Item
                    name={[level, nameof<FormValues>(o => o.monthlyApportValue)]}
                    label="Monthly Apport"
                    labelCol={{ span: 24 }}
                  >
                    <InputNumber
                      style={{ width: '100%' }}
                      formatter={formatCurrency}
                      min={0}
                      decimalSeparator=","
                      precision={2}
                      required
                    />
                  </Form.Item>
                </Col>

                <Col span={4}>
                  <Form.Item
                    name={[level, nameof<FormValues>(o => o.rentabilityTax)]}
                    label="Rentability Tax"
                    labelCol={{ span: 24 }}
                  >
                    <InputNumber
                      style={{ width: '100%' }}
                      formatter={formatPercent}
                      min={0}
                      decimalSeparator=","
                      precision={2}
                      required
                    />
                  </Form.Item>
                </Col>

                <Col span={6}>
                  <Form.Item
                    name={[level, nameof<FormValues>(o => o.value)]}
                    label="Goal Value"
                    labelCol={{ span: 24 }}
                  >
                    <InputNumber
                      style={{ width: '100%' }}
                      formatter={formatCurrency}
                      min={0}
                      decimalSeparator=","
                      precision={2}
                      required
                    />
                  </Form.Item>
                </Col>
              </>
            );
          })}
        </Form>
      </div>
    </>
  );
}
