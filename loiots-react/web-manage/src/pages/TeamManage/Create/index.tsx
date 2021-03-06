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
              breadcrumbName: '??????????????????',
            },
            {
              path: '',
              breadcrumbName: `${type === 'edit' ? '??????' : '??????'}????????????`,
            },
          ],
        },
      }}
      footer={[
        <Button key={uuidv4()} onClick={() => {
          formRef?.current?.validateFields().then((values) => {
            const payload = type === 'edit' ? { ...values, id } : values;
            AddResearcher(payload).then(res => {
              message.success('????????????');
              history.go(-1)
            })
          })
        }} type="primary">
          ??????
        </Button>,
        <Button onClick={() => {
          formRef?.current?.resetFields()
          setFileList([])
        }} key={uuidv4()}>??????</Button>,
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
          label="??????"
          placeholder="???????????????"
          rules={[{ required: true, message: '???????????????' }]}
        />
        <ProFormText
          width="md"
          name="descr"
          label="??????"
          placeholder="???????????????"
          rules={[{ required: true, message: '???????????????' }]}
        />
        <ProFormUploadButton max={1}
          rules={[{ required: true, message: '???????????????' }]}
          fieldProps={{
            ...getUploadProps(setFileList, formRef, 'profileImgLink'),
            fileList: fileList,
            onChange: handleChange
          }} label="??????" name="profileImgLink"
        />
        <ProFormCkeditor width="large"
          initialValue={content}
          rules={[{ required: true, message: '???????????????' }]}
          name="detailInfo"
          label="??????" />
      </ProForm>
    </PageContainer >
  );
};