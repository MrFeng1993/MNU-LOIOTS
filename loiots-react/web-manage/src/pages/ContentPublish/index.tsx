import { DownOutlined, EllipsisOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Tag, Tooltip, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import type { ActionType } from '@ant-design/pro-components';
import { getColumns } from './config';
import { getSpell } from 'jian-pinyin'
import { getArticleList, getArticle, ListOnArticle, TakeDownArticle, DelArticle, getMenuDict } from '../../api/ContentPublish';



export default () => {
  console.log('团队管理页面');

  const navigate = useNavigate();
  const [mapping, setMapping] = useState()
  const actionRef = useRef<ActionType>();
  const [options, setOptions] = useState([]);


  useEffect(() => {
    getOptions()
    getMenuMapping()
  }, [])

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

  const goToEdit = (record) => {
    const { id, creator } = record
    navigate(`/content_publish/create?type=edit&id=${id}&creator=${creator}`);
  }

  const getMenuMapping = async () => {
    const data = await getMenuDict()
    data && setMapping(data as any)
  }

  return (
    <ProTable
      actionRef={actionRef}
      cardBordered
      // @ts-ignore ts-message: Property 'columns' is missing in type '{}' but required in type 'ProTableProps<TableListItem>'.
      columns={getColumns(ListOnArticle, TakeDownArticle, DelArticle, actionRef, mapping, goToEdit, options)}
      request={async (params, sorter, filter) => {
        const { current, pageSize, part } = params;
        const data = await getArticleList({
          ...params,
          currentNo: current,
          pageSize: pageSize,
        });
        // @ts-ignore ts-message: Property 'data' is missing in type '{}' but required in type 'ProTableProps<TableListItem>'.
        const { totalPages, object } = data
        return Promise.resolve({
          data: object,
          total: totalPages,
          success: true,
        });
      }}
      rowKey="key"
      pagination={{
        showQuickJumper: true,
      }}
      dateFormatter="string"
      headerTitle="内容发布"
      options={false}
      toolBarRender={() => [
        <Button key="primary" type="primary" onClick={() => {
          navigate('/content_publish/create');
        }}>
          创建内容
        </Button>,
      ]}
    />
  );
};