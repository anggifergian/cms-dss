import React, { useEffect } from 'react'
import { Layout, Menu } from 'antd'
import { useMatch, useNavigate } from 'react-router-dom'

const { Sider } = Layout

function Sidebar({ isCollapsed }) {
  const navigate = useNavigate()

  return (
    <Sider
      width={250}
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
            onClick: ({ key }) => navigate(key)
          },
          {
            key: '/app/user',
            label: 'User',
            onClick: ({ key }) => navigate(key)
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