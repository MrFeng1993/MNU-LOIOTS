import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import useUrlState from '@ahooksjs/use-url-state';
import type { MenuProps } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { AppRoutes, menuItems } from './router/routes';
import './App.css';

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [selecetdMenu, setSelectedMenu] = useState('')
  const queryParams = useUrlState()[0];
  const location = useLocation();
  const { pathname } = location;


  useEffect(() => {
    setSelectedMenu(pathname);
  }, [pathname])


  const handleMenuClick = (e: any) => {
    console.log(e.key);
    setSelectedMenu(e.key);
    navigate(e.key, {
      replace: true,
    });
  };

  return (
    <Layout style={{
      height: '100vh',
      overflow: 'hidden',
    }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selecetdMenu]}
          onClick={handleMenuClick}
          items={menuItems}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background">
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: '24px',
            height: '100%',
            overflow: 'scroll'
          }}
        >
          <AppRoutes />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;


