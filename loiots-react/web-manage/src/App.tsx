import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { AppRoutes, menuItems } from './router/routes';
import './App.css';

const items: MenuProps['items'] = [
  {
    label: '首页',
    key: 'home',
  },
  {
    label: '实验室简介',
    key: 'lab'
  },
  {
    label: '新 闻 信 息',
    key: 'news',
    children: [
      {
        type: 'group',
        label: '',
        children: [
          {
            label: '综合新闻',
            key: 'news_info',
          },
          {
            label: '通知公告',
            key: 'announcement',
          },
        ],
      },
    ],
  },
  {
    label: '科 研 队 伍',
    key: 'researchers',
    children: [
      {
        type: 'group',
        label: '',
        children: [
          {
            label: '人才情况',
            key: 'talented_info',
          },
          {
            label: '教师动态',
            key: 'teacher_info',
          },
        ],
      },
    ],
  },
  {
    label: '科 学 研 究',
    key: 'research',
    children: [
      {
        type: 'group',
        label: '',
        children: [
          {
            label: '研究方向',
            key: 'research_direction',
          },
          {
            label: '研究成果',
            key: 'research_outcome',
          },
          {
            label: '学术活动',
            key: 'academi_activity',
          },
        ],
      },
    ],
  },
  {
    label: '实 验 室 管 理',
    key: 'lab_manage',
    children: [
      {
        type: 'group',
        label: '',
        children: [
          {
            label: '管理制度',
            key: 'lab_manage_system',
          },
          {
            label: '实验室安全',
            key: 'lab_manage_security',
          },
        ],
      },
    ],
  },
  {
    label: '研究合作',
    key: 'research_cooperation',
    children: [
      {
        type: 'group',
        label: '',
        children: [
          {
            label: '项目合作',
            key: 'research_cooperation_project',
          },
          {
            label: '联系我们',
            key: 'research_cooperation_contact',
          },
        ],
      },
    ],
  }
];

const App: React.FC = () => {
  const navigate = useNavigate();

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    console.log(e);
    // navigate(e.key, {
    //   replace: true,
    // });
  };

  return (
    <Layout style={{ height: '100vh', width: '80vw', margin: '0 auto' }}>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['1']}
        items={items}
        onClick={handleMenuClick}
      />
      <Layout className="site-layout">
        <div
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <AppRoutes />
        </div>
      </Layout>
    </Layout>
  );
};

export default App;
