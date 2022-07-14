import { DownOutlined, EllipsisOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Tag, Tooltip } from 'antd';

export type Status = {
  color: string;
  text: string;
};

export type TableListItem = {
  key: number;
  name: string;
  containers: number;
  creator: string;
  status: Status;
  createdAt: number;
};

const statusMap = {
  0: {
    color: 'blue',
    text: '进行中',
  },
  1: {
    color: 'green',
    text: '已完成',
  },
  2: {
    color: 'volcano',
    text: '警告',
  },
  3: {
    color: 'red',
    text: '失败',
  },
  4: {
    color: '',
    text: '未完成',
  },
};


const columns = [
  {
    title: '序号',
    width: 120,
    dataIndex: 'id',
    search: false,
    render: (_) => <a>{_}</a>,
  },
  {
    title: '姓名',
    width: 120,
    dataIndex: 'name',
    render: (_, record) => <Tag color={record.status.color}>{record.status.text}</Tag>,
  },
  {
    title: '概述',
    width: 120,
    search: false,
    dataIndex: 'desc',
    sorter: (a, b) => a.containers - b.containers,
  },
  {
    title: '操作',
    width: 164,
    key: 'option',
    valueType: 'option',
    render: () => [
      <a key="1">上移</a>,
      <a key="2">下移</a>,
      <a key="3">编辑</a>,
      <a key="3">删除</a>,
    ],
  },
];

export {
  statusMap,
  columns
};