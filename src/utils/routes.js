import Dashboard from "../pages/Dashboard"
import Company from "../pages/Master/Company"
import Region from "../pages/Master/Region"

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
        key: 'role',
        path: '/master-data/region',
        component: Region,
        title: 'Region',
        icon: null
      },
    ]
  }
]