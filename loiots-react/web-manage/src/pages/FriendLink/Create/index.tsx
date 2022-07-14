import { ProForm, ProFormRadio, ProFormText, ProFormUploadDragger } from '@ant-design/pro-components';
import { Col, message, Row, Space } from 'antd';
import { useState } from 'react';
import ProFormCkeditor from '../../../components/CkEditor';


type LayoutType = Parameters<typeof ProForm>[0]['layout'];
const LAYOUT_TYPE_HORIZONTAL = 'horizontal';

const waitTime = (time: number = 100) => new Promise((resolve) => {
  setTimeout(() => {
    resolve(true);
  }, time);
});

export default () => {
  const [formLayoutType, setFormLayoutType] = useState<LayoutType>(LAYOUT_TYPE_HORIZONTAL);

  const formItemLayout =
    formLayoutType === LAYOUT_TYPE_HORIZONTAL
      ? {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      }
      : null;

  return (
    <ProForm<{
      name: string;
      company?: string;
      useMode?: string;
    }>
      {...formItemLayout}
      layout={'horizontal'}
      submitter={{
        render: (props, doms) => {
          console.log(props, doms);
          return formLayoutType === LAYOUT_TYPE_HORIZONTAL ? (
            <Row>
              <Col span={14} offset={4}>
                <Space>{doms}</Space>
              </Col>
            </Row>
          ) : (
            doms
          );
        },
      }}
      onFinish={async (values) => {
        await waitTime(2000);
        console.log(values);
        message.success('提交成功');
      }}
      params={{}}
      request={async () => {
        await waitTime(100);
        return {
          name: null,
          useMode: null,
        };
      }}
    >
      <ProFormText
        width="md"
        name="name"
        label="姓名"
        placeholder="请输入姓名"
      />
      <ProFormText
        width="md"
        name="address"
        label="地址"
        placeholder="请输入地址链接"
      />
      <ProFormUploadDragger label="封面" name="dragger" action="upload.do" />

    </ProForm>
  );
};