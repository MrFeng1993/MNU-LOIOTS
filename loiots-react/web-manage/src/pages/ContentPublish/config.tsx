import { Button, message, Popconfirm, Tag } from 'antd';
const getColumns = (ListOnArticle, TakeDownArticle, DelArticle, actionRef, mapping, goToEdit) => [
  {
    title: '序号',
    width: 120,
    dataIndex: 'id',
    search: false,
  },
  {
    title: '栏目',
    width: 120,
    dataIndex: 'part',
    render: (text, record) => mapping && mapping[text]
  },
  {
    title: '标题',
    width: 120,
    dataIndex: 'title',
  },
  {
    title: '状态',
    width: 120,
    dataIndex: 'status',
    render: (text, record) => {
      return text === 0 ? <Tag color="red">已下架</Tag> : <Tag color="green">已上架</Tag>;
    }
  },
  {
    title: '操作',
    width: 164,
    key: 'option',
    valueType: 'option',
    render: (_, record) => {
      return (
        <>
          {
            record.status === 0 ?
              (<Popconfirm
                key="listOn"
                title="确认要上架吗?"
                onConfirm={() => {
                  ListOnArticle(record?.id).then((res) => {
                    actionRef.current.reload();
                    message.success('上架成功')
                  })
                }}
                okText="是"
                cancelText="否"
              >
                <Button type='link' key="1">
                  上架
                </Button>
              </Popconfirm>) :
              <Popconfirm
                key="listOn"
                title="确认要下架吗?"
                onConfirm={() => {
                  TakeDownArticle(record?.id).then((res) => {
                    actionRef.current.reload();
                    message.success('下架成功')
                  })
                }}
                okText="是"
                cancelText="否"
              >
                <Button type='link' key="12">
                  下架
                </Button>
              </Popconfirm>
          }
          {
            record?.creator !== 'system' &&
            <Popconfirm
              key="del"
              title="确认要删除吗?"
              onConfirm={() => {
                DelArticle(record?.id).then((res) => {
                  actionRef.current.reload();
                  message.success('删除成功')
                })
              }}
              okText="是"
              cancelText="否"
            >
              <Button type='link' key="del">删除</Button>
            </Popconfirm>
          }
          <Button type='link' key="del" onClick={() => {
            goToEdit && goToEdit(record.id);
          }}>编辑</Button>
        </>
      )
    },
  },
];

export {
  getColumns
};