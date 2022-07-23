// @ts-nocheck
import { useEffect, useState } from 'react';
import { Card } from 'antd';
import { Avatar, List, Badge } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getArticleList } from '../../api/Content'
import { Empty, Button } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { CaretRightOutlined } from '@ant-design/icons';
import { useSize } from 'ahooks';
import Slider from '../../layout/carousel';
import './index.css';



export default () => {
  const [articleList, setArticleList] = useState<any[]>([]);
  const navigate = useNavigate();
  const size = useSize(document.querySelector('body'));

  const getList = async (code) => getArticleList({
    "currentNo": 1,
    "pageSize": 5,
    "part": [code],
    "status": 1//0-已下架动态，1-已上架动态，不传-已上架+已下架动态
  })

  useEffect(() => {
    Promise.all([getList('TZGG'), getList('ZHXW'), getList('XSHD')]).then(res => {
      const data = [
        {
          title: '通知公告',
          code: 'TZGG',
          color: 'purple',
          path: 'news/notice',
          list: res[0]?.object
        },
        {
          title: '新闻信息',
          path: 'news/notice',
          code: 'ZHXW',
          color: 'volcano',
          list: res[1]?.object
        },
        {
          title: '学术活动',
          path: 'research/academic_activity',
          code: 'XSHD',
          color: 'cyan',
          list: res[2]?.object
        },
      ];
      setArticleList(data)
    })
  }, [])


  return (
    <div key='home'>
      <Slider />
      <List
        style={{ padding: '40px' }}
        itemLayout="vertical"
        grid={{ gutter: 16, xs: 1, sm: 1, md: 1, lg: 3, xl: 3, xxl: 3 }}
        dataSource={articleList}
        renderItem={item => (
          <List.Item key={uuidv4()}>
            <Badge.Ribbon placement="start" text={item.title} color={item.color}>
              <Card style={{ height: '350px' }} extra={<a onClick={() => {
                const { code, path } = item;
                navigate(`/${path}?code=${code}`)
              }}>更多</a>}>
                {
                  item.list.length > 0 ?
                    item.list?.map(ele => (
                      <List.Item.Meta
                        key={uuidv4()}
                        title={
                          <div className='title' onClick={() => {
                            const { id } = ele;
                            const { code } = item;
                            navigate(`/content?id=${id}&code=${code}`)
                          }}>
                            <div className='textWrapper'>
                              <CaretRightOutlined style={{ color: '#1890ff' }} />
                              <div className='home_text'>{ele.title}</div>
                            </div>
                            <a className='home_date'>{ele.createTime?.split(' ')[0]}</a>
                          </div>

                        }
                      />
                    )) :
                    <Empty description="暂无内容" />
                }
              </Card>
            </Badge.Ribbon>
          </List.Item>
        )
        }
      />
    </div >
  );
};