import { PageContainer } from '@ant-design/pro-components';
import { Card } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';

export default () => {
  const customLoadingDom = useMemo(
    () => <div style={{ color: 'red', padding: '30px', textAlign: 'center' }}>自定义加载...</div>,
    [],
  );
  const [customLoading, setCustomLoading] = useState<React.ReactNode | boolean>(customLoadingDom);

  useEffect(() => {
    setTimeout(() => {
      setCustomLoading(false);
    }, 3000);
  }, []);

  return (
    <div>
      这是首页
    </div >
  );
};