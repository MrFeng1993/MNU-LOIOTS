// @ts-nocheck
import { useRef } from 'react';
import { ProForm, ProFormRadio, ProFormText, ProFormUploadButton } from '@ant-design/pro-components';
import type { ProFormInstance } from '@ant-design/pro-components';
import { Col, message, Row, Space } from 'antd';
import { useState } from 'react';
import ProFormCkeditor from '../../../components/CkEditor';
import { AddResearcher } from '../../../api/TeamManage';
import { getUploadProps } from '../../../utils';


export default () => {
  const formRef = useRef<ProFormInstance>();
  const [fileList, setFileList] = useState([]);

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 }
  }

  const handleChange = (file) => {
    const { fileList } = file;
    setFileList(fileList);
  }


  return (
    <ProForm
      {...formItemLayout}
      layout={'horizontal'}
      formRef={formRef}
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
      <ProFormUploadButton max={1} fieldProps={{
        ...getUploadProps(setFileList, formRef, 'profileImgLink'),
        fileList: fileList,
        onChange: handleChange
      }} label="图片" name="profileImgLink" />
      <ProFormCkeditor width="large"
        name="detailInfo"
        label="内容" />
    </ProForm>
  );
};