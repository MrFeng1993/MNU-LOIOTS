import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { PageContainer } from '@ant-design/pro-components';
import { useNavigate } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { AppRoutes, MENU_ITEMS, ROUTERS } from '../router/routes';
import SliderPage from './carousel';
import FriendLink from './friendLink';
import CopyRight from './CopyRight';
import './App.css';

const App: React.FC = () => {
  const navigate = useNavigate();

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    const targetMenuItem = ROUTERS.find(item => item.key === e.key);
    navigate(`${e.key}?code=${targetMenuItem?.meta?.code || 'home'}`);
  };

  return (
    <div className='wrapper'
    >
      <Layout>
        <header>
          <div className='header'>
            <div className='logo'>
              <img className='logo-banner' src="http://82.156.213.198/medias/52542da4.png" alt="" />
            </div>
            <div className='desc'>物联网安全四川重点实验室</div>
          </div>
        </header>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={MENU_ITEMS}
          onClick={handleMenuClick}
        />
        <SliderPage />
        <Layout className="site-layout">
          <div
            className="site-layout-background"
            style={{
              minHeight: 280,
            }}
          >
            <AppRoutes />
          </div>
        </Layout>
        <FriendLink />
        <CopyRight />
      </Layout>
    </div >
  );
};

export default App;
