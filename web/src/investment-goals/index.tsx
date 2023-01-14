import { Row, Typography } from 'antd';

export function InvestmentGoals() {
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
          Type / Level / Monthly apport value / Goal value / Rentability tax
        </Row>
      </div>
    </>
  );
}
