import { Card } from 'antd';
import React from 'react';

const { Meta } = Card;

const data = [
  {
    id: '西安电子科技大学',
  }, {
    id: '西安外国语大学'
  }, {
    id: '西安科技大学'
  }
]

const App: React.FC = () => (
  <Card>
    <div style={{ display: 'flex' }}>
      {
        data.map(item => <Card
          style={{ width: '100%' }}
          hoverable
        >
          <Meta title={item.id} description="省部共建学校" />
        </Card>)
      }
    </div >
  </Card >
);

export default App;