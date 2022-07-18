import { ProForm } from '@ant-design/pro-components';
import { Col, message, Row, Space, Input } from 'antd';
import { useState } from 'react';
import Ckeditor from './content';


const ProFormCkeditor = (props) => {
  return (
    <ProForm.Item {...props}>
      <Ckeditor {...props} />
    </ProForm.Item>
  );
};

export default ProFormCkeditor;