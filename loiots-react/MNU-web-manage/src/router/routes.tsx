import React from 'react';
import Home from '../pages/Home'
import List from '../pages/List'
import Detail from '../pages/Detail'
import Parser from '../pages/Parser'
import Rubber from '../pages/Rubber'
import Editor from '../pages/MarkDownEditor'
import CkEditor from '../pages/CkEditor'
import { useRoutes,} from "react-router-dom";
import { UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons';

// Variable path must be the same as variable key
const menuItems = [
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
        path: '/Rubber',
        key: '/Rubber',
        label: 'Rubber',
        element: <Rubber />,
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
        label: '富文本编辑器',
        element: <CkEditor />,
        icon: <UploadOutlined />,
    },
]



const AppRoutes: React.FC = () => {
    const routes = useRoutes(menuItems)
    return routes;
}


export {
    AppRoutes,
    menuItems
}

