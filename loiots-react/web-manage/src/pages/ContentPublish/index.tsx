import { DownOutlined, EllipsisOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Tag, Tooltip, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import type { ActionType } from '@ant-design/pro-components';
import { getColumns } from './config';
import { getArticle, ListOnArticle, TakeDownArticle, DelArticle } from '../../api/ContentPublish';



export default () => {
  console.log('团队管理页面');
  const navigate = useNavigate();
  const actionRef = useRef<ActionType>();

  return (
    <ProTable
      actionRef={actionRef}
      cardBordered
      // @ts-ignore ts-message: Property 'columns' is missing in type '{}' but required in type 'ProTableProps<TableListItem>'.
      columns={getColumns(ListOnArticle, TakeDownArticle, DelArticle, actionRef)}
      request={async (params, sorter, filter) => {
        const { current, pageSize, part } = params;
        const data = await getArticle({
          currentNo: current,
          pageSize: pageSize,
          part
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