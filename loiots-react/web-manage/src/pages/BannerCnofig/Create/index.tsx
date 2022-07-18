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
import { createBanner, getBanner } from '../../../api/BannerConfig';
import { getUploadProps } from '../../../utils';

export default () => {

  const formRef = useRef<ProFormInstance>();
  const [fileList, setFileList] = useState([]);
  const queryParams = useUrlState()[0];
  const { type, id } = queryParams;


  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 },
  }

  const handleChange = (file) => {
    const { fileList } = file;
    setFileList(fileList);
  }

  const getListData = async () => {
    const data = await getBanner(id)
    setFileList([{
      uid: uuidv4(),
      name: data?.imgLink?.split('/').pop(),
      url: data?.imgLink
    }]);
    formRef.current?.setFieldsValue({ ...data })
  }

  useEffect(() => {
    if (type === 'edit' && id) {
      getListData(id)
    }
  }, [type, id])


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
              path: '/banner_config',
              breadcrumbName: '轮播图管理',
            },
            {
              path: '',
              breadcrumbName: `${type === 'edit' ? '编辑' : '新建'}轮播图`,
            },
          ],
        },
      }}
      footer={[
        <Button key={uuidv4()} onClick={() => {
          formRef?.current?.validateFields().then((values) => {
            const payload = type === 'edit' ? { ...values, id } : values;
            createBanner(payload).then(res => {
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
          name="name"
          label="轮播图标题"
          placeholder="请输入轮播图标题"
          rules={[{ required: true, message: '请输入轮播图标题' }]}
        />
        <ProFormUploadButton max={1} fieldProps={{
          ...getUploadProps(setFileList, formRef, 'imgLink'),
          fileList: fileList,
          onChange: handleChange
        }} label="轮播图" name="imgLink"
          rules={[{ required: true, message: '请上传轮播图' }]}
        />
        <ProFormText
          width="md"
          name="link"
          label="轮播跳转链接"
          placeholder="请输入轮播跳转链接"
          rules={[{ required: true, message: '请输入轮播跳转链接' }]}
        />
      </ProForm>
    </PageContainer>
  )
};