import React, { useEffect, useState } from 'react';
import { getArticle, getResearcher } from '../../api/Content'
import useUrlState from '@ahooksjs/use-url-state';
import { Empty } from 'antd';

const Content: React.FC = () => {

  return (
    <div style={{
      display: 'flex',
      height: '130px',
      color: 'white',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <div>物联网安全四川省高校重点实验室 地址：绵阳市高新区绵兴西路166号  邮编：621000</div>

      <div>Copyright 2016 中国·四川·绵阳师范学院 　版权所有</div>
    </div>
  )

};

export default Content;
