import React, { useEffect } from 'react'
import { Layout, Menu } from 'antd'
import { privateRoutes } from "../../utils/routes"

const { Sider } = Layout


function Sidebar({ isCollapsed }) {

  useEffect(() => {

  }, [])

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
            key: '/app/home',
            label: 'Home',
          },
          {
            key: '/app/region',
            label: 'Region',
          },
          {
            key: '/app/user',
            label: 'User',
          },
          {
            key: '3',
            label: 'Branch',
          },
        ]}
      />
    </Sider>
  )
}

export default Sidebar