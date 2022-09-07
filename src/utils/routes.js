import {
  AppstoreOutlined,
  DashboardOutlined,
  DollarCircleOutlined,
  PlayCircleOutlined
} from "@ant-design/icons"

import Dashboard from "../pages/Dashboard"
import Company from "../pages/Company"
import Region from "../pages/Region"
import Branch from "../pages/Branch"
import Device from "../pages/Device"
import Position from "../pages/Position"
import Resource from "../pages/Resource"
import Login from "../pages/Login"
import Promo from "../pages/Promo"
import Playlist from "../pages/Playlist";
import User from "../pages/User"
import ForgotPassword from "../pages/Password"
import FormCreate from "../pages/Playlist/components/FormCreate"
import RunningText from '../pages/RunningText'

export const publicRoutes = [
  {
    key: 'home',
    exact: true,
    path: '/',
    component: Login
  },
  {
    key: 'login',
    exact: true,
    path: '/login',
    component: Login
  },
]

export const privateRoutes = [
  {
    key: 'dashboard',
    path: '/dashboard',
    component: Dashboard,
    title: 'Dashboard',
    sidebar: true,
    icon: <DashboardOutlined />,
  },
  {
    key: 'formPlaylist',
    path: '/playlist/new',
    component: FormCreate,
    title: 'Form Playlist',
    sidebar: false,
    icon: '',
  },
  {
    key: 'master_data',
    title: 'Master Data',
    sidebar: true,
    icon: <AppstoreOutlined />,
    submenu: [
      {
        key: 'company',
        path: '/master-data/company',
        component: Company,
        title: 'Company',
        icon: null,
      },
      {
        key: 'region',
        path: '/master-data/region',
        component: Region,
        title: 'Region',
        icon: null
      },
      {
        key: 'branch',
        path: '/master-data/branch',
        component: Branch,
        title: 'Branch',
        icon: null
      },
      {
        key: 'device',
        path: '/master-data/device',
        component: Device,
        title: 'Device',
        icon: null
      },
      {
        key: 'position',
        path: '/master-data/position',
        component: Position,
        title: 'Position',
        icon: null
      },
      {
        key: 'resource',
        path: '/master-data/resource',
        component: Resource,
        title: 'Resource',
        icon: null
      },
      {
        key: 'runningText',
        path: '/master-data/running-text',
        component: RunningText,
        title: 'Running Text',
        icon: null
      }
    ]
  },
  {
    key: 'promo',
    path: '/promo',
    component: Promo,
    title: 'Promo',
    sidebar: true,
    icon: <DollarCircleOutlined />,
  },
  {
    key: 'playlist',
    path: '/playlist',
    component: Playlist,
    title: 'Playlist',
    sidebar: true,
    icon: <PlayCircleOutlined />,
  },
  {
    key: 'change-password',
    path: '/change-password',
    component: ForgotPassword,
    title: 'Change Password',
    sidebar: false,
    icon: '',
  },
  {
    key: 'profile',
    path: '/profile',
    component: User,
    title: 'User',
    sidebar: false,
    icon: '',
  },
]