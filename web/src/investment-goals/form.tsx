import { Col, Form, FormInstance, Input, Select } from 'antd';
import { Fragment, useEffect, useMemo } from 'react';
import type {
  InvestmentGoalsQuery,
  useCreateUpdateInvestmentGoalsMutation,
} from './graphql/__generated__/index.gql.generated';
import { defaultValuesDto, PerLevelValues, FormValues, onSubmit } from './helpers';
import { InputNumberMoney } from '../components/input-number-money';
import { InputNumberPercent } from '../components/input-number-percent';
import { GoalLevel, GoalType } from '../types';

export function InvestmentGoalsEditForm({
  data,
  form,
  createUpdateMany: createUpdateDelete,
}: {
  data: InvestmentGoalsQuery | undefined;
  form: FormInstance<any>;
  createUpdateMany: ReturnType<typeof useCreateUpdateInvestmentGoalsMutation>[0];
}) {
  const defaultValues = useMemo<FormValues>(() => {
    const defVal: Pick<PerLevelValues, 'type' | 'monthlyApportValue' | 'value'> = {
      type: GoalType.Value,
      monthlyApportValue: 0,
      value: 0,
    };
    return [GoalLevel.Pessimist, GoalLevel.Realist, GoalLevel.Optimist].reduce((prev, level, i) => {
      const found = data?.investmentGoals?.find(goal => goal.level === level);
      if (found) return { ...prev, [level]: defaultValuesDto(found) };
      const rentabilityTax = 9 + i * 2;
      const res: PerLevelValues = { ...defVal, level, rentabilityTax };
      return { ...prev, [level]: res };
    }, {} as FormValues);
  }, [data]);

  useEffect(() => {
    form.setFieldsValue(defaultValues);
  }, [defaultValues]);

  return (
    <Form
      layout="inline"
      size="large"
      form={form}
      onFinish={async values => {
        const datas = onSubmit(values);
        await createUpdateDelete({
          variables: {
            createMany: datas.createMany,
            updateMany: { updateMany: datas.updateMany },
          },
        });
      }}
    >
      {Object.values([GoalLevel.Pessimist, GoalLevel.Realist, GoalLevel.Optimist]).map(level => {
        const initialValue = defaultValues[level];
        console.log('initialValue', initialValue);
        return (
          <Fragment key={level}>
            <Form.Item name={[level, nameof<PerLevelValues>(o => o.id)]} hidden>
              <Input />
            </Form.Item>

            <Col span={4}>
              <Form.Item name={[level, nameof<PerLevelValues>(o => o.level)]} label="Level" labelCol={{ span: 24 }}>
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
              <Form.Item name={[level, nameof<PerLevelValues>(o => o.type)]} label="Type" labelCol={{ span: 24 }}>
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
                name={[level, nameof<PerLevelValues>(o => o.monthlyApportValue)]}
                label="Monthly Apport"
                labelCol={{ span: 24 }}
              >
                <InputNumberMoney />
              </Form.Item>
            </Col>

            <Col span={4}>
              <Form.Item
                name={[level, nameof<PerLevelValues>(o => o.rentabilityTax)]}
                label="Rentability Tax"
                labelCol={{ span: 24 }}
              >
                <InputNumberPercent />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                name={[level, nameof<PerLevelValues>(o => o.value)]}
                label="Goal Value"
                labelCol={{ span: 24 }}
              >
                <InputNumberMoney />
              </Form.Item>
            </Col>
          </Fragment>
        );
      })}
    </Form>
  );
}
