// @ts-nocheck
import { DownOutlined, EllipsisOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Tag, Tooltip, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import type { ActionType } from '@ant-design/pro-components';
import { getColumns } from './config';
import { getBannerList, delBanner } from '../../api/BannerConfig';



export default () => {

  const navigate = useNavigate();
  const actionRef = useRef<ActionType>();

  const goToEdit = (id) => {
    navigate(`/banner_config/create?type=edit&id=${id}`);
  }

  return (
    <ProTable
      actionRef={actionRef}
      search={false}
      cardBordered
      // @ts-ignore ts-message: Property 'columns' is missing in type '{}' but required in type 'ProTableProps<TableListItem>'.
      columns={getColumns(goToEdit, delBanner, actionRef)}
      request={async (params, sorter, filter) => {
        const { current, pageSize, part } = params;
        const data = await getBannerList({
          ...params,
          currentNo: current,
          pageSize: pageSize,
        });
        // @ts-ignore ts-message: Property 'data' is missing in type '{}' but required in type 'ProTableProps<TableListItem>'.
        return Promise.resolve({
          data,
          total: data?.length,
          success: true,
        });
      }}
      rowKey="id"
      pagination={{
        showQuickJumper: true,
      }}
      dateFormatter="string"
      headerTitle="轮播图管理"
      options={false}
      toolBarRender={() => [
        <Button key="primary" type="primary" onClick={() => {
          navigate('/banner_config/create');
        }}>
          创建
        </Button>,
      ]}
    />
  );
};