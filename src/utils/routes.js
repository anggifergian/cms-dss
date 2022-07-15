import Dashboard from "../pages/Dashboard"
import Company from "../pages/Master/Company"
import Region from "../pages/Master/Region"
import Branch from "../pages/Master/Branch"
import Device from "../pages/Master/Device"
import Position from "../pages/Master/Position"
import Resource from "../pages/Master/Resource"
import Login from "../pages/Login"

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
    icon: null,
  },
  {
    key: 'master_data',
    title: 'Master Data',
    sidebar: true,
    icon: null,
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
    ]
  }
]