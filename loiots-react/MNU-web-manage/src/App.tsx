import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate } from "react-router-dom";
import type { MenuProps } from 'antd'
import {
  MenuUnfoldOutlined, MenuFoldOutlined
} from '@ant-design/icons';
import { AppRoutes, menuItems } from './router/routes'
import './App.css'


interface IMenuItems {
  path: String
  key: String,
  label: String,
  element: React.ReactElement
  icon:  React.ReactElement
}

const App: React.FC = () => {

  const { Header, Sider, Content } = Layout
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate();

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    console.log(e);
    navigate(e.key, {
      replace: true
    })
  }

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={menuItems}
          onClick={handleMenuClick}
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
            padding: 24,
            minHeight: 280,
          }}
        >
          <AppRoutes />
        </Content>
      </Layout>
    </Layout>
  )
}

export default App;
