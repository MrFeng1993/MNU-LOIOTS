import { ProForm } from '@ant-design/pro-components';
import { Col, message, Row, Space, Input } from 'antd';
import { useState } from 'react';
import Ckeditor from './content';


const ProFormCkeditor = (props) => {
  console.log(props);
  return (
    <ProForm.Item {...props}>
      <Ckeditor />
    </ProForm.Item>
  );
};

export default ProFormCkeditor;