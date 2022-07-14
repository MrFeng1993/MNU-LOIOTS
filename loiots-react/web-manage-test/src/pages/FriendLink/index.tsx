import { DownOutlined, EllipsisOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Tag, Tooltip, Input } from 'antd';
import type { TableListItem } from './config';
import { statusMap, columns } from './config';


const tableListDataSource: TableListItem[] = [];

const creators = ['付小小', '曲丽丽', '林东东', '陈帅帅', '兼某某'];

for (let i = 0; i < 5; i += 1) {
  tableListDataSource.push({
    key: i,
    name: 'AppName',
    containers: Math.floor(Math.random() * 20),
    creator: creators[Math.floor(Math.random() * creators.length)],
    status: statusMap[Math.floor(Math.random() * 10) % 5],
    createdAt: Date.now() - Math.floor(Math.random() * 100000),
  });
}


export default () => {
  console.log('团队管理页面');
  return (
    <ProTable<TableListItem>
      cardBordered
      // @ts-ignore ts-message: Property 'columns' is missing in type '{}' but required in type 'ProTableProps<TableListItem>'.
      columns={columns}
      request={(params, sorter, filter) => {
        // 表单搜索项会从 params 传入，传递给后端接口。
        console.log(params, sorter, filter);
        return Promise.resolve({
          data: tableListDataSource,
          success: true,
        });
      }}
      rowKey="key"
      pagination={{
        showQuickJumper: true,
      }}
      dateFormatter="string"
      headerTitle="友情链接"
      options={false}
      toolBarRender={() => [
        <Button key="primary" type="primary">
          创建链接
        </Button>,
      ]}
    />
  );
};