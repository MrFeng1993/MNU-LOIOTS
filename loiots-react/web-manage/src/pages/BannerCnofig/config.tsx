import { Button, message, Popconfirm, Tag, Image } from 'antd';
import { v4 as uuidv4 } from 'uuid';

const getColumns = (goToEdit, delBanner, actionRef) => [
  {
    title: '标题',
    width: 120,
    key: uuidv4(),
    dataIndex: 'name',
    search: false,
  },
  {
    title: '轮播图',
    width: 120,
    key: uuidv4(),
    dataIndex: 'imgLink',
    search: false,
    render: (text, record) => {
      return <Image height={100} width={100} src={text} alt="" />;
    }
  },
  {
    title: '创建时间',
    width: 120,
    key: uuidv4(),
    dataIndex: 'createTime',
    valueType: 'date',
    search: false,
  },
  {
    title: '跳转链接',
    width: 120,
    dataIndex: 'link',
    key: uuidv4(),
    search: false,
    render: (text, record) => {
      return <a target="_blank" onClick={() => {
        window.open(`http://${text}`, '_blank')
      }}>{text}</a>;
    }
  },
  {
    title: '操作',
    width: 164,
    key: 'option',
    valueType: 'option',
    render: (_, record) => {
      return [
        <a key={uuidv4()} onClick={() => {
          goToEdit(record?.id);
        }}>编辑</a>,

        <Popconfirm
          key={uuidv4()}
          title="确认要删除吗?"
          onConfirm={() => {
            delBanner(record?.id).then(res => {
              actionRef.current?.reload();
              message.success('删除成功');
            })
          }}
          okText="是"
          cancelText="否"
        >
          <a type='link' key={uuidv4()}>
            删除
          </a>
        </Popconfirm>

      ]
    },
  },
];

export {
  getColumns
};