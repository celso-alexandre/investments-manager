import { Button, Col, Form, InputNumber, Select, Skeleton, Typography } from 'antd';
import { Fragment, useMemo } from 'react';
import { GoalLevel, GoalType } from '../types';
import {
  InvestmentGoalDocument,
  useCreateInvestmentGoalsMutation,
  useInvestmentGoalsQuery,
  useUpdateInvestmentGoalsMutation,
} from './graphql/__generated__/index.gql.generated';
import { defaultValuesDto, FormValues, InitialValues, onSubmit } from './helpers';

export function InvestmentGoals() {
  const [form] = Form.useForm();
  const { data, loading: loadingData } = useInvestmentGoalsQuery({ fetchPolicy: 'cache-and-network' });
  const [updateMany, { loading: loadingUpdate }] = useUpdateInvestmentGoalsMutation({
    refetchQueries: [InvestmentGoalDocument],
  });
  const [createMany, { loading: loadingCreate }] = useCreateInvestmentGoalsMutation({
    refetchQueries: [InvestmentGoalDocument],
  });

  const defaultValues = useMemo<InitialValues>(() => {
    const defVal: Pick<FormValues, 'type' | 'monthlyApportValue' | 'value'> = {
      type: GoalType.Value,
      monthlyApportValue: 0,
      value: 0,
    };
    return [GoalLevel.Pessimist, GoalLevel.Realist, GoalLevel.Optimist].reduce((prev, level, i) => {
      const found = data?.investmentGoals?.find(goal => goal.level === level);
      if (found) return { ...prev, [level]: defaultValuesDto(found) };
      const rentabilityTax = 9 + i * 2;
      const res: FormValues = { ...defVal, level, rentabilityTax };
      return { ...prev, [level]: res };
    }, {} as InitialValues);
  }, [data]);
  console.log('data', data, loadingData);
  console.log('defaultValues', defaultValues);

  const isLoading = useMemo(
    () => loadingData || loadingCreate || loadingUpdate,
    [loadingData, loadingCreate, loadingUpdate]
  );
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
        <Form
          layout="inline"
          size="large"
          form={form}
          initialValues={defaultValues}
          onFinish={async values => {
            const datas = onSubmit(values);
            const promises = [
              ...(!datas.createMany.data.length ? [] : [createMany({ variables: datas.createMany })]),
              ...(!datas.updateMany.length ? [] : [updateMany({ variables: { updateMany: datas.updateMany } })]),
            ];
            await Promise.all(promises);
          }}
        >
          {Object.values([GoalLevel.Pessimist, GoalLevel.Realist, GoalLevel.Optimist]).map(level => {
            const initialValue = defaultValues[level];
            console.log('initialValue', initialValue);
            return (
              <Fragment key={level}>
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
                      addonBefore="$"
                      min={0}
                      decimalSeparator=","
                      precision={2}
                      step={1}
                      stringMode
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
                      addonBefore="%"
                      min={0}
                      decimalSeparator=","
                      precision={2}
                      step={1}
                      stringMode
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
                      addonBefore="$"
                      min={0}
                      decimalSeparator=","
                      precision={2}
                      step={1}
                      stringMode
                      required
                    />
                  </Form.Item>
                </Col>
              </Fragment>
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
