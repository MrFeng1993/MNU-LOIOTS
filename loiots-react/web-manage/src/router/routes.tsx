import React from 'react';
import { useRoutes, } from 'react-router-dom';
import { UserOutlined, VideoCameraOutlined, UploadOutlined, LinkOutlined, EditOutlined } from '@ant-design/icons';
import Home from '../pages/Home';
import TeamManage from '../pages/TeamManage';
import TeamManageCreate from '../pages/TeamManage/Create';
import ContentPublish from '../pages/ContentPublish';
import ContentPublishCreate from '../pages/ContentPublish/Create';
import FriendLink from '../pages/FriendLink';
import FriendLinkCreate from '../pages/FriendLink/Create';
import List from '../pages/List';
import Detail from '../pages/Detail';
import Parser from '../pages/Parser';
import Editor from '../pages/MarkDownEditor';

const menuItemsArr = [
    {
        path: '/',
        key: '/',
        visible: true,
        type: 'sub',
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
        path: '/team_manage/create',
        key: '/team_manage_create',
        label: '科研队伍管理',
        visible: true,
        type: 'sub',
        element: <TeamManageCreate />,
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
        path: '/content_publish/create',
        key: '/content_publish_create',
        label: '内容发布',
        visible: true,
        type: 'sub',
        element: <ContentPublishCreate />,
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
    {
        path: '/friend_link/Create',
        key: '/friend_link_create',
        label: '友情链接',
        visible: true,
        type: 'sub',
        element: <FriendLinkCreate />,
        icon: <LinkOutlined />,
    },
];

const AppRoutesItems = menuItemsArr.filter(item => item.visible);
const menuItems = menuItemsArr.filter(item => item.visible && item.type !== 'sub');

const AppRoutes: React.FC = () => {
    const routes = useRoutes(AppRoutesItems);
    return routes;
};

export {
    AppRoutes,
    menuItems
};

