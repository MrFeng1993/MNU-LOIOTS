// @ts-nocheck
import { useRef, useEffect } from 'react';
import { ProForm, ProFormRadio, ProFormText, ProFormUploadButton } from '@ant-design/pro-components';
import type { ProFormInstance } from '@ant-design/pro-components';
import { Col, message, Row, Space } from 'antd';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useUrlState from '@ahooksjs/use-url-state';
import ProFormCkeditor from '../../../components/CkEditor';
import { AddResearcher, getResearcher } from '../../../api/TeamManage';
import { getUploadProps } from '../../../utils';


export default () => {
  const formRef = useRef<ProFormInstance>();
  const [fileList, setFileList] = useState([]);
  const [detailInfo, setDetailInfo] = useState('')
  const queryParams = useUrlState({ code: '' })[0];
  const { type, id } = queryParams;


  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 }
  }

  const handleChange = (file) => {
    const { fileList } = file;
    setFileList(fileList);
  }

  const getDataDetail = async () => {
    const data = await getResearcher(id)
    formRef?.current?.setFieldsValue({
      ...data
    });
    setDetailInfo(data?.detailInfo);
    setFileList([
      {
        uid: uuidv4(),
        name: data?.profileImgLink?.split('/')?.pop() || '',
        url: data?.profileImgLink,
      }
    ])
  }


  useEffect(() => {
    if (type === 'edit' && id) {
      getDataDetail()
    }
  }, [id, type])

  return (
    <ProForm
      {...formItemLayout}
      layout={'horizontal'}
      formRef={formRef}
      submitter={{
        render: (props, doms) => {
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
        let payload = values
        if (type === 'edit') {
          payload = {
            ...values,
            id
          }
        }
        AddResearcher(payload).then(res => {
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
        rules={[{ required: true, message: '请输入姓名' }]}
      />
      <ProFormText
        width="md"
        name="descr"
        label="介绍"
        placeholder="请填写介绍"
        rules={[{ required: true, message: '请填写介绍' }]}
      />
      <ProFormUploadButton max={1} fieldProps={{
        ...getUploadProps(setFileList, formRef, 'profileImgLink'),
        fileList: fileList,
        onChange: handleChange
      }} label="图片" name="profileImgLink"
      />
      <ProFormCkeditor
        defaultValue={detailInfo}
        width="large"
        rules={[{ required: true, message: '请填写内容' }]}
        name="detailInfo"
        label="内容" />
    </ProForm>
  );
};