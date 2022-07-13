import React, { useEffect } from 'react'
import { Layout, Menu } from 'antd'
import { privateRoutes } from "../../utils/routes"
import { useHistory } from 'react-router-dom'

const { Sider } = Layout


function Sidebar({ isCollapsed }) {

  const history = useHistory()

  return (
    <Sider
      width={250}
      breakpoint="lg"
      collapsible
      collapsed={isCollapsed}
      trigger={null}
      style={{
        backgroundColor: '#fff'
      }}
    >
      <div className='flex justify-center items-center my-8'>
        <h3 className='text-lg font-bold text-blue-600'>CMS DSS</h3>
      </div>

      <Menu
        mode="inline"
        items={[
          {
            key: '/dashboard',
            label: 'Home',
            onClick: (key) => history.push(key),
          },
          {
            key: '/master-data/company',
            label: 'Company',
            onClick: (key) => history.push(key)
          },
          {
            key: '/master-data/region',
            label: 'Region',
            onClick: (key) => history.push(key)
          },
          {
            key: '/master-data/branch',
            label: 'Branch',
            onClick: (key) => history.push(key)
          },
        ]}
      />
    </Sider>
  )
}

export default Sidebar