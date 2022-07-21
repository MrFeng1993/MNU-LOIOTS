import { Card } from 'antd';
import React from 'react';

const { Meta } = Card;

const data = [
  {
    id: '国家自然科学基金委员会',
    url: 'https://www.nsfc.gov.cn/'
  }, {
    id: '四川省科学技术厅',
    url: 'http://kjt.sc.gov.cn/'
  }
]

const App: React.FC = () => (
  <div style={{ color: 'black', lineHeight: '60px', cursor: 'pointer', width: '100%', paddingLeft: '20px', textAlign: 'center' }}>
    <span style={{
      fontSize: '16px',
      color: 'white',
      marginRight: '3px'
    }}>
      友情链接：
    </span>
    <div style={{
      display: 'inline-block',
      color: 'white',
    }}>
      {
        data.map(item => <span onClick={() => {
          location.href = item.url
        }} style={{ display: 'inline-block', paddingLeft: '15px', lineHeight: '15px', marginRight: '20px', fontSize: '16px', borderLeft: '1px solid white', }}>{item.id}</span>)
      }
    </div>
  </div >
);

export default App;