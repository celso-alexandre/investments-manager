import { Button, Col, Form, InputNumber, Select, Skeleton, Typography } from 'antd';
import { useMemo } from 'react';
import * as Types from '../types';
import { GoalLevel, GoalType } from '../types';
import {
  InvestmentGoalDocument,
  useCreateInvestmentGoalsMutation,
  useInvestmentGoalsQuery,
  useUpdateInvestmentGoalsMutation,
} from './graphql/__generated__/index.gql.generated';
import { formatCurrency, formatPercent } from '../helpers';

type FormValues = Types.InvestmentGoalCreateInput & { id?: string };
// eslint-disable-next-line no-unused-vars
type InitialValues = { [key in GoalLevel]: FormValues };
export function InvestmentGoals() {
  const [form] = Form.useForm();
  const { data, loading: loadingData } = useInvestmentGoalsQuery({ fetchPolicy: 'cache-and-network' });
  const [updateMany, { loading: loadingUpdate }] = useUpdateInvestmentGoalsMutation({
    refetchQueries: [InvestmentGoalDocument],
  });
  const [createMany, { loading: loadingCreate }] = useCreateInvestmentGoalsMutation({
    refetchQueries: [InvestmentGoalDocument],
  });

  async function onSubmit(submittedValues: InitialValues) {
    const datas = Object.values(submittedValues).reduce(
      (prev, cur) => {
        if (cur.id) {
          prev.updateMany.push({
            where: { id: +cur.id },
            data: Object.entries(cur).reduce((prev_, [key_, value_]) => {
              if (key_ === 'id') return prev_;
              return { ...prev_, [key_]: { set: value_ } };
            }, {} as (typeof prev)['updateMany'][0]['data']),
          });
          return prev;
        }

        prev.createMany.data.push({ ...cur, id: undefined });
        return prev;
      },
      {
        updateMany: [] as Types.MutationUpdateInvestmentGoalsArgs['updateMany'],
        createMany: { data: [] } as Types.MutationCreateInvestmentGoalsArgs,
      }
    );

    const promises = [
      ...(!datas.createMany.data.length ? [] : [createMany({ variables: datas.createMany })]),
      ...(!datas.updateMany.length ? [] : [updateMany({ variables: { updateMany: datas.updateMany } })]),
    ];
    await Promise.all(promises);
  }

  const isLoading = useMemo(
    () => loadingData || loadingCreate || loadingUpdate,
    [loadingData, loadingCreate, loadingUpdate]
  );

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
          <div style={{ width: '100%', textAlign: 'center', marginTop: '20px' }}>
            <Button
              onClick={() => {
                form.submit();
              }}
            >
              Save & reload
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}
