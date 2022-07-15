import { ProForm } from '@ant-design/pro-components';
import { Col, message, Row, Space, Input } from 'antd';
import { useState } from 'react';
import Ckeditor from './content';


const Editor = (props) => {
  const { content } = props
  return (
    <Ckeditor content={content} />
  );
};

export default Editor;