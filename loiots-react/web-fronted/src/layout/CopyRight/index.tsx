// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { getArticle, getResearcher } from '../../api/Content'
import useUrlState from '@ahooksjs/use-url-state';
import { Empty } from 'antd';


const Content: React.FC = () => {

  return (
    <div style={{
      display: 'flex',
      height: '180px',
      color: 'white',
      lineHeight: '180px',
      justifyContent: 'center'
    }}>
      <div>绵阳师范学院传媒学院 地址：绵阳市高新区绵兴西路166号  邮编：621000</div>
      <div>蜀ICP备05006457号-1 蜀ICP备05006457号-2 蜀ICP备05006457号-3  川公网安备 51070402110029号</div>
    </div >

  )

};

export default Content;
