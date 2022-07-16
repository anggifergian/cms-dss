import React, { useState } from 'react'
import { Layout } from 'antd'

import Sidebar from '../Sidebar'

function BaseLayout({ children }) {
  const [state] = useState({
    sidebarCollapsed: false
  })

  return (
    <div className='min-h-screen bg-gray-100'>
      <Layout style={{ height: '100vh' }}>
        <Sidebar
          isCollapsed={state.sidebarCollapsed}
        />

        <div className='w-full mx-6 md:mx-10 mt-20 lg:mx-auto lg:max-w-screen-lg'>
          {children}
        </div>
      </Layout>
    </div>
  )
}

export default BaseLayout