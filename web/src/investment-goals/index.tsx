import { Form, Skeleton } from 'antd';
import { useMemo } from 'react';
import { Title } from '../components/title';
import { InvestmentGoalsEditForm } from './form';
import {
  InvestmentGoalDocument,
  useCreateInvestmentGoalsMutation,
  useInvestmentGoalsQuery,
  useUpdateInvestmentGoalsMutation,
} from './graphql/__generated__/index.gql.generated';

export function InvestmentGoals() {
  const [form] = Form.useForm();
  const { data, loading: loadingData } = useInvestmentGoalsQuery({ fetchPolicy: 'cache-and-network' });
  const [updateMany, { loading: loadingUpdate }] = useUpdateInvestmentGoalsMutation({
    refetchQueries: [InvestmentGoalDocument],
  });
  const [createMany, { loading: loadingCreate }] = useCreateInvestmentGoalsMutation({
    refetchQueries: [InvestmentGoalDocument],
  });

  const isLoading = useMemo(
    () => loadingData || loadingCreate || loadingUpdate,
    [loadingData, loadingCreate, loadingUpdate]
  );
  if (isLoading) return <Skeleton />;

  return (
    <>
      <Title title="Investment Goals" />

      <div style={{ padding: '0px 30px' }}>
        <InvestmentGoalsEditForm data={data} form={form} createMany={createMany} updateMany={updateMany} />
      </div>
    </>
  );
}
