import { message, Popconfirm, Tag } from 'antd';
import { v4 as uuidv4 } from 'uuid';

const getColumns = (goToContent, code) => {
  const columns = [
    {
      title: '序号',
      width: 120,
      key: uuidv4(),
      dataIndex: 'id',
      search: false,
      belong: 'dynamic'
    },
    {
      title: '头像',
      width: 120,
      key: uuidv4(),
      dataIndex: 'profileImgLink',
      belong: 'researcher',
      search: false,
      render: (text, record) => {
        return (
          <img src={record?.profileImgLink || 'http://82.156.213.198/medias/52542da4.png'} style={{ width: '100px', height: '100px' }} />
        )
      }
    },
    {
      title: '标题',
      width: 120,
      key: uuidv4(),
      dataIndex: 'title',
      belong: 'dynamic'
    },
    {
      title: '姓名',
      width: 120,
      key: uuidv4(),
      dataIndex: 'name',
      belong: 'researcher',
    },
    {
      title: '操作',
      width: 120,
      belong: 'all',
      key: uuidv4(),
      search: false,
      render: (record) => {
        return (
          <>
            <a href="" key={uuidv4()} onClick={() => {
              goToContent(record?.id)
            }}>查看</a>
          </>
        )
      }
    }
  ];
  return code === 'KYRY' ?
    columns.filter(item => item.belong === 'researcher' || item.belong === 'all') :
    columns.filter(item => item.belong === 'dynamic' || item.belong === 'all')
}

export {
  getColumns
};