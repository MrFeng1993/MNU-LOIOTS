import { ProForm, ProFormRadio, ProFormText, ProFormUploadDragger } from '@ant-design/pro-components';
import { Col, message, Row, Space } from 'antd';
import { useState } from 'react';
import ProFormCkeditor from '../../../components/CkEditor';
import { AddResearcher } from '../../../api/TeamManage';


type LayoutType = Parameters<typeof ProForm>[0]['layout'];
const LAYOUT_TYPE_HORIZONTAL = 'horizontal';

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
    <ProForm
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
        console.log(values);
        AddResearcher(values).then(res => {
          message.success('提交成功');
          history.go(-1)
        })
      }}
      params={{}}
      // @ts-ignore
      request={async () => {
        return {
          name: '',
          desc: '',
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
        name="desc"
        label="概述"
        tooltip="最长为 24 位"
        placeholder="请填写概述"
      />
      <ProFormUploadDragger label="图片" name="dragger" action="upload.do" />
      <ProFormCkeditor width="md"
        label="富文本内容" />
    </ProForm>
  );
};