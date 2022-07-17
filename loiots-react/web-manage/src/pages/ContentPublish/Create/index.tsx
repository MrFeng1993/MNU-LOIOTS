// @ts-nocheck
import { useEffect, useRef } from 'react';
import { ProForm, ProFormRadio, ProFormText, ProFormUploadButton } from '@ant-design/pro-components';
import type { ProFormInstance } from '@ant-design/pro-components';
import { Col, message, Row, Space } from 'antd';
import { useState } from 'react';
import ProFormCkeditor from '../../../components/CkEditor';
import { v4 as uuidv4 } from 'uuid';
import useUrlState from '@ahooksjs/use-url-state';
import { AddArticle, getMenuDict, getArticle } from '../../../api/ContentPublish';
import { getUploadProps } from '../../../utils';

export default () => {

  const formRef = useRef<ProFormInstance>();
  const [fileList, setFileList] = useState([]);
  const [options, setOptions] = useState([]);
  const queryParams = useUrlState({ code: '' })[0];
  const [detailInfo, setDetailInfo] = useState('')
  const { type, id } = queryParams;

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  }

  const handleChange = (file) => {
    const { fileList } = file;
    setFileList(fileList);
  }

  const getDataDetail = async () => {
    const data = await getArticle(id)
    formRef?.current?.setFieldsValue({
      ...data
    });
    setDetailInfo(data?.content);
    setFileList([
      {
        uid: uuidv4(),
        name: data?.coverImgLink?.split('/')?.pop() || '',
        url: data?.coverImgLink,
      }
    ])
  }


  useEffect(() => {
    if (type === 'edit' && id) {
      getDataDetail()
    }
  }, [id, type])

  const getOptions = async () => {
    const arr = ['LXWM', 'SYSJJ', 'SYSAS', 'RCQK']
    const data = await getMenuDict()
    const options = Object.keys(data).map(key => {
      return {
        label: data[key],
        value: key
      }
    }).filter(item => {
      return !arr.includes(item.value)
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
        let payload = values
        if (type === 'edit') {
          payload = {
            ...values,
            id
          }
        }
        AddArticle(payload).then(res => {
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
        rules={[{ required: true, message: '请输入姓名' }]}
      />
      <ProFormUploadButton max={1} fieldProps={{
        ...getUploadProps(setFileList, formRef, 'coverImgLink'),
        fileList: fileList,
        onChange: handleChange
      }} label="图片" name="coverImgLink"
      />
      <ProFormRadio.Group
        name="part"
        label="栏目"
        options={options}
        rules={[{ required: true, message: '请选择栏目' }]}
      />
      <ProFormCkeditor width="md"
        defaultValue={detailInfo}
        rules={[{ required: true, message: '请填写内容' }]}
        name="content"
        label="内容" />
    </ProForm>
  );
};