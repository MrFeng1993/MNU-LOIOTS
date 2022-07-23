import { LineOutlined } from '@ant-design/icons';
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
  <div style={{ color: 'white', lineHeight: '60px', cursor: 'pointer', width: '100%', paddingLeft: '20px', textAlign: 'center' }}>
    <span style={{ fontSize: '18px' }}>
      友情链接：
    </span>
    
    <span>
    <LineOutlined rotate={90}/>
    <span onClick={() => {
          location.href = 'https://www.nsfc.gov.cn/'
        }} style={{ display: 'inline-block', padding: '0 20px', fontSize: '18px', }}>国家自然科学基金委员会</span>
    <LineOutlined rotate={90}/>
    <span onClick={() => {
      location.href = 'http://kjt.sc.gov.cn/'
    }} style={{ display: 'inline-block', padding: '0 20px', fontSize: '18px', }}>四川省科学技术厅</span>
      
    </span>
  </div >
);

export default App;