import { Row } from 'antd'
import React from 'react'

import { BaseLayout, Title } from '../../containers/'

const Dashboard = () => {
  return (
    <BaseLayout>
      <Row align='bottom' justify='start' style={{ marginBottom: 20 }}>
        <Title label="Dashboard" />
      </Row>

      <div className='w-full rounded bg-white p-6'>
        Welcome!
      </div>
    </BaseLayout>
  )
}

export default Dashboard