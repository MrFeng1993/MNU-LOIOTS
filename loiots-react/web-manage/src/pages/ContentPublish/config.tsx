import { message, Popconfirm, Tag } from 'antd';
const getColumns = (ListOnArticle, TakeDownArticle, DelArticle, actionRef, mapping) => [
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
    render: (text, record) => mapping[text]
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
    render: (_, record) => [
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
              <a key="1">
                上架
              </a>
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
              <a key="1">
                下架
              </a>
            </Popconfirm>
        }



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
          <a key="del">删除</a>
        </Popconfirm>
      </>
    ],
  },
];

export {
  getColumns
};