// @ts-nocheck
import { useEffect, useState } from 'react';
import { Card } from 'antd';
import { Avatar, List } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getArticleList } from '../../api/Content'
import { Empty } from 'antd';
import { v4 as uuidv4 } from 'uuid';


export default () => {
  const [articleList, setArticleList] = useState<any[]>([]);
  const navigate = useNavigate();

  const getList = async (code) => getArticleList({
    "currentNo": 1,
    "pageSize": 5,
    "part": [code],
    "status": 1//0-已下架动态，1-已上架动态，不传-已上架+已下架动态
  })

  useEffect(() => {
    Promise.all([getList('TZGG'), getList('XWXX'), getList('XSHD')]).then(res => {
      const data = [
        {
          title: '通知公告',
          code: 'TZGG',
          list: res[0]?.object
        },
        {
          title: '新闻信息',
          code: 'XWXX',
          list: res[1]?.object
        },
        {
          title: '学术活动',
          code: 'XSHD',
          list: res[2]?.object
        },
      ];
      setArticleList(data)
    })
  }, [])

  return (
    <div>
      <List
        style={{ padding: '40px' }}
        grid={{ gutter: 16, column: 3 }}
        dataSource={articleList}
        renderItem={item => (
          <List.Item key={uuidv4()}>
            <Card style={{ minHeight: '300px' }} title={item.title}>
              {
                item.list.length > 0 ?
                  item.list?.map(ele => (
                    <List.Item.Meta
                      key={uuidv4()}
                      title={<a onClick={() => {
                        const { id } = ele;
                        const { code } = item;
                        navigate(`/content?id=${id}&code=${code}`)
                      }}>标题：{ele.title}</a>}
                    />
                  )) :
                  <Empty description="暂无内容" />

              }
            </Card>
          </List.Item>
        )}
      />
    </div >
  );
};