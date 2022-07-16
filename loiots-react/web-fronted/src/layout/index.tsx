// @ts-nocheck
import React, { useState } from 'react';
import { Layout, Menu, Input } from 'antd';
import { PageContainer } from '@ant-design/pro-components';
import { useNavigate } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { AppRoutes, MENU_ITEMS, ROUTERS } from '../router/routes';
import SliderPage from './carousel';
import FriendLink from './friendLink';
import CopyRight from './CopyRight';
import './App.css';

const { Search } = Input;
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
              <img className='logo-banner' src="http://82.156.213.198/medias/ecffd803.png" alt="" />
            </div>
            
            <div style={{position:"absolute",right:"60px"}}>
            <Search
              placeholder="输入关键字搜索"
              allowClear
              // onSearch={onSearch}
              style={{
                width: 200,
              }}
            />
            </div>
          </div>
        </header>
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={MENU_ITEMS}
          onClick={handleMenuClick}
          style = {{fontSize:"16px",paddingLeft:"88px",lineHeight:"100px"}}
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

        <div style={{
          backgroundImage: 'url("http://www.mnu.cn/images/footer-bg.jpg")'
        }}>

          <CopyRight />
        </div>

      </Layout>
    </div >
  );
};

export default App;
