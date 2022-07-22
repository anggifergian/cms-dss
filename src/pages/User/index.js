import { Row } from 'antd'
import React from 'react'

import { BaseLayout, Title } from '../../containers'

const User = () => {
  return (
    <BaseLayout>
      <Row
        align="bottom"
        justify="space-between"
        style={{ marginBottom: 20 }}
      >
        <Title label="User" />
      </Row>

      <div className='w-full bg-white p-4 rounded-md shadow-sm'>
        /app/user
      </div>
    </BaseLayout>
  )
}

export default User