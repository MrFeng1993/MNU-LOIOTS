import React from 'react';
import { useRoutes, } from 'react-router-dom';
import { UserOutlined, VideoCameraOutlined, UploadOutlined, LinkOutlined, EditOutlined } from '@ant-design/icons';
import Home from '../pages/Home';
import TeamManage from '../pages/TeamManage';
import ContentPublish from '../pages/ContentPublish';
import FriendLink from '../pages/FriendLink';
import List from '../pages/List';
import Detail from '../pages/Detail';
import Parser from '../pages/Parser';
import Editor from '../pages/MarkDownEditor';
import CkEditor from '../pages/CkEditor';

const menuItemsArr = [
    {
        path: '/',
        key: '/',
        label: 'Home',
        element: <Home />,
        icon: <UserOutlined />
    },
    {
        path: '/list',
        key: '/list',
        label: 'list',
        element: <List />,
        icon: <VideoCameraOutlined />,
    },
    {
        path: '/detail',
        key: '/detail',
        label: 'detail',
        element: <Detail />,
        icon: <UploadOutlined />,
    },
    {
        path: '/Parser',
        key: '/Parser',
        label: 'Parser',
        element: <Parser />,
        icon: <UploadOutlined />,
    },
    {
        path: '/Editor',
        key: '/Editor',
        label: 'MarkDown编辑器',
        element: <Editor />,
        icon: <UploadOutlined />,
    },
    {
        path: '/CkEditor',
        key: '/CkEditor',
        visible: true,
        label: '富文本编辑器',
        element: <CkEditor />,
        icon: <EditOutlined />,
    },
    {
        path: '/media_library',
        key: '/media_library',
        label: '媒体库',
        element: <Parser />,
        icon: <UploadOutlined />,
    },
    {
        path: '/team_manage',
        key: '/team_manage',
        label: '科研队伍管理',
        visible: true,
        element: <TeamManage />,
        icon: <UserOutlined />
    },
    {
        path: '/content_publish',
        key: '/content_publish',
        label: '内容发布',
        visible: true,
        element: <ContentPublish />,
        icon: <VideoCameraOutlined />,
    },
    {
        path: '/friend_link',
        key: '/friend_link',
        label: '友情链接',
        visible: true,
        element: <FriendLink />,
        icon: <LinkOutlined />,
    },
];

const menuItems = menuItemsArr.filter(item => item.visible);

const AppRoutes: React.FC = () => {
    const routes = useRoutes(menuItems);
    return routes;
};

export {
    AppRoutes,
    menuItems
};

