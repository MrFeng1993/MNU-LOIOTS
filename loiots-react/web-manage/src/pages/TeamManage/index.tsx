import { useEffect, useRef } from 'react';
import type { ActionType } from '@ant-design/pro-components';
import { DownOutlined, EllipsisOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Tag, Tooltip, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getColumns } from './config';
import { getResearcherList, moveUpResearcher, moveDownResearcher, delResearcher } from '../../api/TeamManage';




export default () => {
  console.log('团队管理页面');
  const navigate = useNavigate();
  const actionRef = useRef<ActionType>();


  const goToEdit = (id) => {
    navigate(`/team_manage/create?type=edit&id=${id}`);
  }

  return (
    <ProTable
      cardBordered
      actionRef={actionRef}
      // @ts-ignore ts-message: Property 'columns' is missing in type '{}' but required in type 'ProTableProps<TableListItem>'.
      columns={getColumns(moveUpResearcher, moveDownResearcher, delResearcher, actionRef, goToEdit)}
      request={async (params, sorter, filter) => {
        const { current, pageSize, name } = params;
        const data = await getResearcherList({
          currentNo: current,
          pageSize: pageSize,
          name: name
        })
        return Promise.resolve({
          // @ts-ignore ts-message: Property 'data' is missing in type '{}' but required in type 'ProTableProps<TableListItem>'.
          data: data?.object,
          success: true,
        });
      }}
      rowKey="key"
      pagination={{
        showQuickJumper: true,
      }}
      dateFormatter="string"
      headerTitle="科研队伍管理"
      options={false}
      toolBarRender={() => [
        <Button key="primary" type="primary" onClick={() => {
          navigate('/team_manage/create');
        }}>
          新增
        </Button>,
      ]}
    />
  );
};