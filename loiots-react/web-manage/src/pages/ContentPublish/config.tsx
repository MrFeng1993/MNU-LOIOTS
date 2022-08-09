import { Button, message, Popconfirm, Tag, Select } from 'antd';

const getColumns = (ListOnArticle, TakeDownArticle, DelArticle, actionRef, mapping, goToEdit, options) => [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '栏目',
    width: 120,
    dataIndex: 'part',
    search: true,
    hideInTable: true,
    renderFormItem: ({ onChange }) => {
      return (
        <Select showSearch={true}
          onChange={(value) => {
            onChange(value)
            console.log(value)
          }}
          filterOption={(input, option) => {
            const targetItem = options.find(item => item.value === option.value);
            return targetItem?.pinyin.includes(input.toLowerCase())
          }
          } placeholder="请选择栏目">
          {
            options.map(item => <Select.Option value={item.value}>{item.label}</Select.Option>)
          }
        </Select >
      )
    }
  },
  {
    title: '栏目',
    width: 120,
    dataIndex: 'part',
    search: false,
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
    render: (text, record) => text === 0 ? <Tag color="red">已下架</Tag> : <Tag color="green">已上架</Tag>
  },
  {
    title: '操作',
    width: 164,
    key: 'option',
    valueType: 'option',
    render: (_, record) => (
      <>
        {
          record.status === 0 ?
            (<Popconfirm
              key="listOn"
              title="确认要上架吗?"
              onConfirm={() => {
                ListOnArticle(record?.id).then((res) => {
                  actionRef.current.reload();
                  message.success('上架成功');
                });
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
                  message.success('下架成功');
                });
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
                message.success('删除成功');
              });
            }}
            okText="是"
            cancelText="否"
          >
            <Button type='link' key="del">删除</Button>
          </Popconfirm>
        }
        <Button type='link' key="del" onClick={() => {
          goToEdit && goToEdit(record);
        }}>编辑</Button>
      </>
    ),
  },
];

export {
  getColumns
};