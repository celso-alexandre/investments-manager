import type * as Types from '../types';
import { GoalLevel } from '../types';
import { serializeDecimalAsInt, serializeIntAsDecimal } from '../helpers';

export type PerLevelValues = Types.InvestmentGoalCreateInput & { id?: string };
export type FormValues = { [key in GoalLevel]: PerLevelValues };

function onSubmitDto({ monthlyApportValue, value, rentabilityTax, ...values }: PerLevelValues): PerLevelValues {
  return {
    ...values,
    monthlyApportValue: serializeDecimalAsInt(monthlyApportValue),
    rentabilityTax: serializeDecimalAsInt(rentabilityTax),
    value: serializeDecimalAsInt(value),
  };
}
export function onSubmit(submittedValues: FormValues) {
  const datas = Object.values(submittedValues).reduce(
    (prev, rawCur) => {
      const cur = onSubmitDto(rawCur);
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

  return datas;
}

export function defaultValuesDto({
  monthlyApportValue,
  value,
  rentabilityTax,
  ...values
}: PerLevelValues): PerLevelValues {
  return {
    ...values,
    monthlyApportValue: serializeIntAsDecimal(monthlyApportValue),
    rentabilityTax: serializeIntAsDecimal(rentabilityTax),
    value: serializeIntAsDecimal(value),
  };
}
