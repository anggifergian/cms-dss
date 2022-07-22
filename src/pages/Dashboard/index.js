import React from 'react'
import { Row } from 'antd'

import { BaseLayout, Title } from '../../containers/'

const Dashboard = () => {
  return (
    <BaseLayout>
      <Row align='bottom' justify='start' style={{ marginBottom: 20 }}>
        <Title label="Dashboard" />
      </Row>

      <div className='w-full bg-white p-4 rounded-md shadow-sm'>
        <p className='text-gray-600'>Welcome!</p>
      </div>
    </BaseLayout>
  )
}

export default Dashboard