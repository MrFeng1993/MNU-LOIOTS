import { message, Popconfirm } from 'antd';

const getColumns = (moveUpResearcher, moveDownResearcher, delResearcher, actionRef, goToEdit) => [
  {
    title: '序号',
    width: 120,
    dataIndex: 'id',
    search: false,
  },
  {
    title: '姓名',
    width: 120,
    dataIndex: 'name',
  },
  {
    title: '概述',
    width: 120,
    search: false,
    dataIndex: 'descr',
  },
  {
    title: '操作',
    width: 164,
    key: 'option',
    valueType: 'option',
    render: (_, record) =>
      [
        <>
          <a key="edit" onClick={() => {
            goToEdit(record.id);
          }}>编辑</a><a key="1" onClick={() => {
            moveUpResearcher(record?.id).then(() => {
              message.success('上移成功');
              actionRef.current.reload();
            });
          }}>上移</a><a key="2" onClick={() => {
            moveDownResearcher(record?.id).then(() => {
              message.success('下移成功');
              actionRef.current.reload();
            });
          }}>下移</a><Popconfirm
            key="del"
            title="确认要删除吗?"
            onConfirm={() => {
              delResearcher(record?.id).then(() => {
                message.success('删除成功');
                actionRef.current.reload();
              });
            }}
            okText="是"
            cancelText="否"
          >
            <a key="del">删除</a>
          </Popconfirm>
        </>
      ]
  }
];

export {
  getColumns
};