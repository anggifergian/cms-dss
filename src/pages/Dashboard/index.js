import React from 'react'

import { BaseLayout, Title } from '../../containers/'

const Dashboard = () => {
  return (
    <BaseLayout>
      <div className='mb-4'>
        <Title label="Dashboard" />
      </div>

      <div className='w-full rounded bg-white p-6'>
        Welcome!
      </div>
    </BaseLayout>
  )
}

export default Dashboard