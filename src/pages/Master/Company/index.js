import React from 'react'

import { Title, BaseLayout } from '../../../containers'

const Company = () => {
  return (
    <BaseLayout>
      <Title label="Company" />

      <div className='w-full rounded bg-white p-6'>
        /master-data/company
      </div>
    </BaseLayout>
  )
}

export default Company