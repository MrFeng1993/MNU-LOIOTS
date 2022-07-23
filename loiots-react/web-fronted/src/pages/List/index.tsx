// @ts-nocheck
import { DownOutlined, EllipsisOutlined, QuestionCircleOutlined, LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable, ProList } from '@ant-design/pro-components';
import { Button, Tag, Tooltip, Input, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import type { ActionType } from '@ant-design/pro-components';
import { PageContainer, WaterMark } from '@ant-design/pro-components';
import { getColumns } from './config';
// import { getArticle, ListOnArticle, TakeDownArticle, DelArticle, getMenuDict } from '../../api/content'
import { getArticleList, getResearcherList, getMenuDict } from '../../api/Content'
import useUrlState from '@ahooksjs/use-url-state';
import { v4 as uuidv4 } from 'uuid';
import React from 'react'

export default () => {

  const queryParams = useUrlState({ code: '' })[0];
  const { code } = queryParams;

  const navigate = useNavigate();
  const [mapping, setMapping] = useState({})
  const [dataSource, serDataSoure] = useState([])

  useEffect(() => {
    getData()
  }, [code])

  const getData = async () => {
    const GetListApi = code === 'KYRY' ? getResearcherList : getArticleList
    const payload = code === 'KYRY' ? {
      current: 1,
      pageSize: 2000
    } :
      {
        current: 1,
        pageSize: 2000,
        part: [code],
        status: 1,
      }
    const data = await GetListApi(payload);
    if (Array.isArray(data?.object) && data?.object.length === 1 && data?.object[0]?.creator === 'system') {
      goToContent(data?.object[0]?.id)
    } else {
      serDataSoure(data?.object || [])
    }
  }

  useEffect(() => {
    getMenuMapping()
  }, [])

  const getMenuMapping = async () => {
    const data = await getMenuDict()
    data && setMapping(data as any)
  }


  const goToContent = (id) => {
    navigate(`/content?id=${id}&code=${code}`)
  }


  return (
    <div
      key={code}
      style={{
        boxShadow: '0 0 8px rgba(0, 0, 0, 0.2)',
      }}
    >
      <Card>
        <PageContainer
          style={{ minHeight: '60vh' }}
          ghost
          header={{
            breadcrumb: {
              routes: [
                {
                  path: '',
                  breadcrumbName: '首页',
                },
                {
                  path: '',
                  breadcrumbName: mapping[code] || '科研人员',
                }
              ],
            },
          }}
        >
          <WaterMark>
            <ProList<{ title: string }>
              itemLayout="vertical"
              rowKey="id"
              pagination={{
                defaultPageSize: 5,
                showSizeChanger: true,
              }}
              dataSource={dataSource}
              onItem={(record: any) => {
                return {
                  onMouseEnter: () => {
                    console.log(record);
                  },
                  onClick: () => {
                    navigate(`/content?id=${record?.id}&code=${code}`)
                  },
                };
              }}
              metas={{
                avatar: {
                  dataIndex: 'image',
                  editable: false,
                  render: (item, record) => {
                    return <img
                      width={200}
                      height={200}
                      alt="logo"
                      src={record?.coverImgLink || record?.profileImgLink || "http://82.156.213.198/medias/52542da4.png"
                      }
                    />
                  }
                },
                title: {
                  render: (item, record) => {
                    return <h3>{record?.name || record?.title}</h3>
                  }
                },
                description: {
                  render: (item, record) => {
                    return (
                      <>
                        {record?.descr || '暂无介绍'}
                      </>
                    )
                  }
                }
              }}
            />
          </WaterMark>
        </PageContainer>
      </Card>
    </div >

  );
};

