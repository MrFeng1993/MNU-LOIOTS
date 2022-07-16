// @ts-nocheck
import { useEffect, useState } from 'react';
import { Card } from 'antd';
import { Avatar, List } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getArticleList } from '../../api/Content'
import { Empty, Button } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { CaretRightOutlined } from '@ant-design/icons';
import { useSize } from 'ahooks';


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
        itemLayout="vertical"
        grid={{ gutter: 16, xs: 1, sm: 1, md: 1, lg: 3, xl: 3, xxl: 3 }}
        dataSource={articleList}
        renderItem={item => (
          <List.Item key={uuidv4()}>
            <Card style={{ minHeight: '300px' }} title={item.title}>
              {
                item.list.length > 0 ?
                  item.list?.map(ele => (
                    <List.Item.Meta
                      key={uuidv4()}
                      title={<Button icon={<CaretRightOutlined />} type="link" onClick={() => {
                        const { id } = ele;
                        const { code } = item;
                        navigate(`/content?id=${id}&code=${code}`)
                      }}>
                        <span style={{
                          textAlign: 'left',
                          // overflow: 'hidden',
                          // textOverflow: 'ellipsis', //文本溢出显示省略号
                          // whiteSpace: 'nowrap' //文本不会换行
                        }}>{ele.title}</span>
                        {/* <span>{ele.createTime?.split(' ')[0]}</span> */}
                      </Button>}
                    />
                  )) :
                  <Empty description="暂无内容" />

              }
            </Card>
          </List.Item>
        )
        }
      />
    </div >
  );
};