import { ProForm, ProFormRadio, ProFormText, ProFormUploadDragger } from '@ant-design/pro-components';
import { Col, message, Row, Space } from 'antd';
import { useState } from 'react';
import ProFormCkeditor from '../../../components/CkEditor';
import { AddArticle } from '../../../api/ContentPublish';

export default () => {

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  }

  // "title":"333333",
  // "part":"YJFX",
  // "coverImgLink":"www.baidu.com",
  // "content":"dgaga<input>sdfggsdfgdsfgd"

  return (
    <ProForm
      {...formItemLayout}
      layout={'horizontal'}
      submitter={{
        render: (props, doms) => {
          console.log(props, doms);
          return (
            <Row>
              <Col span={14} offset={4}>
                <Space>{doms}</Space>
              </Col>
            </Row>
          )
        },
      }}
      onFinish={async (values) => {
        AddArticle(values).then(res => {
          history.go(-1)
          message.success('提交成功');
        })
      }}
      params={{}}
      request={async () => {
        console.log(111);
        return {
          name: null,
          useMode: null,
        };
      }}
    >
      <ProFormText
        width="md"
        name="title"
        label="标题"
        placeholder="请输入姓名"
      />
      <ProFormUploadDragger label="封面" name="coverImgLink" action="upload.do" />
      <ProFormRadio.Group
        name="part"
        label="栏目"
        options={[
          {
            label: 'item 1',
            value: 'a',
          },
          {
            label: 'item 2',
            value: 'b',
          },
          {
            label: 'item 3',
            value: 'c',
          },
        ]}
      />
      <ProFormCkeditor width="md"
        name="content"
        label="富文本内容" />
    </ProForm>
  );
};