import React from 'react'

import { BaseLayout, Title } from '../../containers'

const User = () => {
  return (
    <BaseLayout>
      <Title label="User" />

      <div className='w-full rounded bg-white p-6'>
        /app/user
      </div>
    </BaseLayout>
  )
}

export default User