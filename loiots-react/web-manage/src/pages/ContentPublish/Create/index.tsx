// @ts-nocheck
import { useEffect, useRef } from 'react';
import { ProForm, ProFormRadio, ProFormText, ProFormUploadButton } from '@ant-design/pro-components';
import type { ProFormInstance } from '@ant-design/pro-components';
import { Col, message, Row, Space } from 'antd';
import { useState } from 'react';
import ProFormCkeditor from '../../../components/CkEditor';
import { AddArticle, getMenuDict } from '../../../api/ContentPublish';
import { getUploadProps } from '../../../utils';

export default () => {

  const formRef = useRef<ProFormInstance>();
  const [fileList, setFileList] = useState([]);
  const [options, setOptions] = useState([]);

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  }

  const handleChange = (file) => {
    const { fileList } = file;
    setFileList(fileList);
  }

  const getOptions = async () => {
    const data = await getMenuDict()
    const options = Object.keys(data).map(key => {
      return {
        label: data[key],
        value: key
      }
    })
    setOptions(options);
  }

  useEffect(() => { getOptions() }, [])



  return (
    <ProForm
      formRef={formRef}
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
      <ProFormUploadButton max={1} fieldProps={{
        ...getUploadProps(setFileList, formRef, 'coverImgLink'),
        fileList: fileList,
        onChange: handleChange
      }} label="图片" name="coverImgLink" />
      <ProFormRadio.Group
        name="part"
        label="栏目"
        options={options}
      />
      <ProFormCkeditor width="md"
        name="content"
        label="内容" />
    </ProForm>
  );
};