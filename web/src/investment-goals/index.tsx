import { Button, Form, Skeleton } from 'antd';
import { useMemo } from 'react';
import { Title } from '../components/title';
import { InvestmentGoalsEditForm } from './form';
import {
  InvestmentGoalsDocument,
  useCreateUpdateInvestmentGoalsMutation,
  useInvestmentGoalsQuery,
} from './graphql/__generated__/index.gql.generated';

export function InvestmentGoals() {
  const [form] = Form.useForm();
  const { data, loading: loadingData } = useInvestmentGoalsQuery({ fetchPolicy: 'cache-and-network' });
  const [createUpdateMany, { loading: loadingCreateUpdate }] = useCreateUpdateInvestmentGoalsMutation({
    refetchQueries: [InvestmentGoalsDocument],
  });

  const isLoading = useMemo(() => loadingData || loadingCreateUpdate, [loadingData, loadingCreateUpdate]);
  if (isLoading) return <Skeleton />;

  return (
    <>
      <Title title="Investment Goals" />

      <div style={{ padding: '0px 30px' }}>
        <InvestmentGoalsEditForm data={data} form={form} createUpdateMany={createUpdateMany} />
      </div>

      <div style={{ width: '100%', textAlign: 'center', marginTop: '20px' }}>
        <Button
          onClick={() => {
            form.submit();
          }}
        >
          Save & reload
        </Button>
      </div>
    </>
  );
}
