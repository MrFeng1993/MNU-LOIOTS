// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { getArticle, getResearcher } from '../../api/Content'
import useUrlState from '@ahooksjs/use-url-state';
import { Empty } from 'antd';
import Editor from '../../components/CkEditor';

const Content: React.FC = () => {

  const queryParams = useUrlState({ code: '' })[0];
  const [data, setData] = useState('')
  const { id, code } = queryParams;

  useEffect(() => {
    id && getArticleContent(id)
  }, [id])

  const getArticleContent = async (ID) => {
    const APIGet = code === 'KYRY' ? getResearcher : getArticle
    const data = await APIGet(ID)
    setData(data)
  }

  return (
    <div style={{ margin: '2% 2%', minHeight: '60vh' }}>
      {
        data ?
          <>
            <div>
              <span style={{ fontSize: '20px' }}>{data.title || data.name}</span>
            </div>
            <Editor style={{ marginTop: '20px' }} content={data?.content || data?.detailInfo} />
          </>
          :
          <Empty style={{ marginTop: '40px' }} description="暂无数据" />
      }
    </div >

  )

};

export default Content;
