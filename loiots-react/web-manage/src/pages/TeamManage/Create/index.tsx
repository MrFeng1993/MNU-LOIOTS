// @ts-nocheck
import { useRef, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { ProForm, ProFormRadio, ProFormText, ProFormUploadButton } from '@ant-design/pro-components';
import type { ProFormInstance } from '@ant-design/pro-components';
import { Divider, message, Row, Space, Button } from 'antd';
import { useState } from 'react';
import useUrlState from '@ahooksjs/use-url-state';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import ProFormCkeditor from '../../../components/CkEditor';
import { AddResearcher, getResearcher } from '../../../api/TeamManage';
import { getUploadProps } from '../../../utils';


export default () => {
  const formRef = useRef<ProFormInstance>();
  const [fileList, setFileList] = useState([]);
  const queryParams = useUrlState()[0];
  const [content, setContent] = useState("")
  const { type, id } = queryParams;

  const formItemLayout = {
    labelCol: { span: 1 },
    wrapperCol: { span: 24 },
  }

  const handleChange = (file) => {
    const { fileList } = file;
    setFileList(fileList);
  }


  const getListData = async () => {
    const data = await getResearcher(id)
    setFileList([{
      uid: uuidv4(),
      name: data?.profileImgLink?.split('/').pop(),
      url: data?.profileImgLink
    }]);
    setContent(data?.detailInfo)
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
              path: '/team_manage',
              breadcrumbName: '科研人员管理',
            },
            {
              path: '',
              breadcrumbName: `${type === 'edit' ? '编辑' : '新增'}科研人员`,
            },
          ],
        },
      }}
      footer={[
        <Button key={uuidv4()} onClick={() => {
          formRef?.current?.validateFields().then((values) => {
            const payload = type === 'edit' ? { ...values, id } : values;
            AddResearcher(payload).then(res => {
              message.success('提交成功');
              history.go(-1)
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
      <Divider />
      <ProForm
        {...formItemLayout}
        layout={'horizontal'}
        formRef={formRef}
        submitter={false}
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
        <ProFormUploadButton max={1}
          rules={[{ required: true, message: '请输入姓名' }]}
          fieldProps={{
            ...getUploadProps(setFileList, formRef, 'profileImgLink'),
            fileList: fileList,
            onChange: handleChange
          }} label="图片" name="profileImgLink"
        />
        <ProFormCkeditor width="large"
          initialValue={content}
          rules={[{ required: true, message: '请填写内容' }]}
          name="detailInfo"
          label="内容" />
      </ProForm>
    </PageContainer >
  );
};