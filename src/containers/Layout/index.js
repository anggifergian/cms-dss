import React, { useState } from 'react'
import { Layout } from 'antd'

import Sidebar from '../Sidebar'

function BaseLayout({ children }) {
  const [state] = useState({
    sidebarCollapsed: false
  })

  return (
    <div className='min-h-screen bg-gray-100'>
      <Layout hasSider>
        <Sidebar
          isCollapsed={state.sidebarCollapsed}
        />

        <Layout style={{ marginLeft: 250 }}>
          <div className='w-full px-6 md:px-10 pt-20 pb-10 lg:mx-auto lg:max-w-screen-lg'>
            {children}
          </div>
        </Layout>
      </Layout>
    </div>
  )
}

export default BaseLayout