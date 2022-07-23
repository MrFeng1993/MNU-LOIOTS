import React, { useState } from 'react';
import { Layout, Menu, Image } from 'antd';
import { useNavigate } from 'react-router-dom';
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
// @ts-ignore
import logo from './assets/logo.png';

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleMenuClick = (e: any) => {
    navigate(e.key, {
      replace: true,
    });
  };

  return (
    <Layout style={{
      height: '100vh',
      overflow: 'hidden',
    }}>
      <Sider style={{ textAlign: 'center' }} trigger={null} collapsible collapsed={collapsed}>
        <img style={{ height: '50px', margin: '15px 0' }} src={logo} />
        {/* <Image height={100} width={100} src={text} alt=""></Image> */}
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['/team_manage']}
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


