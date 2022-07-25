// @ts-nocheck
import { useEffect, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { ProForm, ProFormRadio, ProFormText, ProFormUploadButton, ProFormSelect } from '@ant-design/pro-components';
import type { ProFormInstance } from '@ant-design/pro-components';
import { Col, message, Row, Divider, Button } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useUrlState from '@ahooksjs/use-url-state';
import { v4 as uuidv4 } from 'uuid';
import ProFormCkeditor from '../../../components/CkEditor';
import { AddArticle, getMenuDict, getArticle } from '../../../api/ContentPublish';
import { getUploadProps } from '../../../utils';
import { getSpell } from 'jian-pinyin'

export default () => {

  const formRef = useRef<ProFormInstance>();
  const [fileList, setFileList] = useState([]);
  const [options, setOptions] = useState([]);
  const queryParams = useUrlState()[0];
  const { type, id, creator } = queryParams;
  const [content, setContent] = useState("")


  const formItemLayout = {
    labelCol: { span: 1 },
    wrapperCol: { span: 24 },
  }

  const handleChange = (file) => {
    const { fileList } = file;
    setFileList(fileList);
  }

  const getListData = async () => {
    const data = await getArticle(id)
    setFileList([{
      uid: uuidv4(),
      name: data?.coverImgLink?.split('/').pop(),
      url: data?.coverImgLink
    }]);
    setContent(data?.content)
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
        value: key,
        pinyin: getSpell(data[key])?.replaceAll(',', '').replaceAll('[', '').replaceAll(']', '')
      }
    }).filter(item => {
      return !arr.includes(item.value)
    })
    setOptions(options);
  }

  useEffect(() => { getOptions() }, [])

  console.log(options);


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
      <Divider />

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
          placeholder="请输入标题"
          rules={[{ required: true, message: '请输入标题' }]}
        />
        <ProFormSelect
          width="md"
          name="part"
          label="栏目"
          options={options}
          fieldProps={{
            disabled: creator === 'system',
            showSearch: true,
            filterOption: (input, option) => {
              return option?.pinyin.includes(input.toLowerCase())
            }
          }}
          rules={[{ required: true, message: '请选择栏目' }]}
        />
        <ProFormUploadButton
          width="md"
          max={1}
          fieldProps={{
            ...getUploadProps(setFileList, formRef, 'coverImgLink'),
            fileList: fileList,
            onChange: handleChange
          }} label="图片" name="coverImgLink"
        />
        <ProFormCkeditor width="md"
          initialValue={content}
          rules={[{ required: true, message: '请填写内容' }]}
          name="content"
          label="内容" />
      </ProForm>
    </PageContainer >
  );
};