import { DownOutlined, EllipsisOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Tag, Tooltip, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import type { ActionType } from '@ant-design/pro-components';
import { getColumns } from './config';
import { getArticleList, getArticle, ListOnArticle, TakeDownArticle, DelArticle, getMenuDict } from '../../api/ContentPublish';



export default () => {
  console.log('团队管理页面');

  const navigate = useNavigate();
  const [mapping, setMapping] = useState()
  const actionRef = useRef<ActionType>();

  useEffect(() => {
    getMenuMapping()
  }, [])

  const goToEdit = (id) => {
    navigate(`/content_publish/create?type=edit&id=${id}`);
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
      columns={getColumns(ListOnArticle, TakeDownArticle, DelArticle, actionRef, mapping, goToEdit)}
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
          创建
        </Button>,
      ]}
    />
  );
};