// @ts-nocheck
import { useEffect, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { ProForm, ProFormRadio, ProFormText, ProFormUploadButton, ProCard } from '@ant-design/pro-components';
import type { ProFormInstance } from '@ant-design/pro-components';
import { Col, message, Row, Space, Button } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useUrlState from '@ahooksjs/use-url-state';
import { v4 as uuidv4 } from 'uuid';
import ProFormCkeditor from '../../../components/CkEditor';
import { AddArticle, getMenuDict, getArticle } from '../../../api/ContentPublish';
import { getUploadProps } from '../../../utils';

export default () => {

  const formRef = useRef<ProFormInstance>();
  const [fileList, setFileList] = useState([]);
  const [options, setOptions] = useState([]);
  const queryParams = useUrlState()[0];
  const [content, setContent] = useState('');
  const { type, id } = queryParams;


  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  }

  const handleChange = (file) => {
    const { fileList } = file;
    setFileList(fileList);
  }

  const getListData = async () => {
    const data = await getArticle(id)
    setContent(data.content)
    setFileList([{
      uid: uuidv4(),
      name: data?.coverImgLink?.split('/').pop(),
      url: data?.coverImgLink
    }]);
    formRef.current?.setFieldsValue({ ...data })
  }

  useEffect(() => {
    if (type === 'edit' && id) {
      getListData(id)
    }
  }, [type, id])

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
    <PageContainer
      ghost
      fixedHeader
      header={{
        breadcrumb: {
          itemRender: (route, params, routes) => {
            const last = routes.indexOf(route) === routes.length - 1;
            return last ? (
              <span key={route.path}>{route.breadcrumbName}</span>
            ) : (
              <Link key={route.path} to={route.path}>
                {route.breadcrumbName}
              </Link>
            );
          },
          routes: [
            {
              path: '/content_publish',
              breadcrumbName: '内容发布',
            },
            {
              path: '',
              breadcrumbName: `${type === 'edit' ? '编辑' : '新建'}内容`,
            },
          ],
        },
      }}
      footer={[
        <Button key={uuidv4()} onClick={() => {
          formRef?.current?.validateFields().then((values) => {
            const payload = type === 'edit' ? { ...values, id } : values;
            AddArticle(payload).then(res => {
              history.go(-1)
              message.success('提交成功');
            })
          })
        }} type="primary">
          提交
        </Button>,
        <Button onClick={() => {
          formRef?.current?.resetFields()
          setFileList([])
        }} key={uuidv4()}>重置</Button>,
      ]}
    >
      <ProForm
        formRef={formRef}
        {...formItemLayout}
        layout={'horizontal'}
        submitter={false}
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
        <ProFormCkeditor
          width="md"
          rules={[{ required: true, message: '请填写内容' }]}
          initialValue={content}
          name="content"
          label="内容" />
      </ProForm>
    </PageContainer >
  );
};