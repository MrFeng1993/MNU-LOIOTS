// @ts-nocheck
import React, { useState } from 'react';
import { Layout, Menu, Input, BackTop } from 'antd';
import { PageContainer } from '@ant-design/pro-components';
import { useNavigate } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { AppRoutes, MENU_ITEMS, ROUTERS } from '../router/routes';
import { ArrowUpOutlined } from '@ant-design/icons';
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

  const style: React.CSSProperties = {
    height: 40,
    width: 40,
    lineHeight: '40px',
    borderRadius: 4,
    backgroundColor: '#1088e9',
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
  };

  return (
    <div className='wrapper'
    >
      <Layout>
        <header>
          <div className='header'>
            <div className='logo'>
              <img className='logo-banner' src="logo2.png" alt="" />
            </div>

            <div>
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
          defaultSelectedKeys={['/home']}
          items={MENU_ITEMS}
          onClick={handleMenuClick}
          style={{
            fontSize: "16px",
            paddingLeft: '2%',
            lineHeight: "70px",
            position: 'sticky',
            zIndex: '99999999',
            top: '0px'
          }}
        />
        {/* <SliderPage /> */}
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

        <div style={{
          backgroundImage: 'url("http://www.mnu.cn/images/footer-bg.jpg")'
        }}>
          <FriendLink />

          <CopyRight />
        </div>
        <BackTop>
          <div style={style}>
            <ArrowUpOutlined />
          </div>
        </BackTop>
      </Layout>
    </div >
  );
};

export default App;
