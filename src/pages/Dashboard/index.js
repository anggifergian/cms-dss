import React from 'react'

import { BaseLayout, Title } from '../../containers/'

const Dashboard = () => {
  return (
    <BaseLayout>
      <Title label="Dashboard" />

      <div className='w-full rounded bg-white p-6'>
        /app/dashboard
      </div>
    </BaseLayout>
  )
}

export default Dashboard