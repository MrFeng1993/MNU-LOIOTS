import { Button, message, Popconfirm, Tag, Image } from 'antd';
import { v4 as uuidv4 } from 'uuid';

const getColumns = (moveUpResearcher, moveDownResearcher, delResearcher, actionRef, goToEdit) => [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    key: uuidv4(),
    width: 48,
  },
  {
    title: '姓名',
    width: 120,
    key: uuidv4(),
    dataIndex: 'name',
  },
  {
    title: '照片',
    width: 120,
    key: uuidv4(),
    dataIndex: 'profileImgLink',
    search: false,
    render: (text, record) => {
      return <Image height={100} width={100} src={text} alt="" />;
    }
  },
  {
    title: '简介',
    width: 120,
    key: uuidv4(),
    search: false,
    dataIndex: 'descr',
  },
  {
    title: '操作',
    width: 164,
    key: uuidv4(),
    valueType: 'option',
    render: (_, record) =>
      [
        <a key={uuidv4()} onClick={() => {
          moveUpResearcher(record?.id).then(() => {
            message.success('上移成功')
            actionRef.current.reload()
          })
        }}>上移</a>,

        <a key={uuidv4()} onClick={() => {
          moveDownResearcher(record?.id).then(() => {
            message.success('下移成功')
            actionRef.current.reload()
          })
        }}>下移</a>,

        <a key={uuidv4()} onClick={() => {
          goToEdit && goToEdit(record.id)
        }}>编辑</a>,

        <Popconfirm
          key={uuidv4()}
          title="确认要删除吗?"
          onConfirm={() => {
            delResearcher(record?.id).then(() => {
              message.success('删除成功')
              actionRef.current.reload()
            })
          }}
          okText="是"
          cancelText="否"
        >
          <a key={uuidv4()}>删除</a>
        </Popconfirm>,
      ]
  }
];

export {
  getColumns
};