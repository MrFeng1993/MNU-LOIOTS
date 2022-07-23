import { LineOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import React from 'react';
import './index.css';

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
    <span style={{ fontSize: '14px' }}>
      友情链接：
    </span>

    {
      data.map(item => (
        <span className='friendLink' onClick={() => {
          location.href = item.url
        }}>{item.id}</span>
      ))
    }
  </div >
);

export default App;