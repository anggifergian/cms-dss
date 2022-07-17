import React from 'react'
import { Row } from 'antd'
import { useDispatch } from 'react-redux'

import { BaseLayout, Title } from '../../containers/'
import { logout } from '../../redux/auth/action'

const Dashboard = () => {
  const dispatch = useDispatch()

  return (
    <BaseLayout>
      <Row align='bottom' justify='start' style={{ marginBottom: 20 }}>
        <Title label="Dashboard" />
      </Row>

      <div className='w-full rounded bg-white p-6'>
        <p>Welcome!</p>

        <button
          onClick={() => dispatch(logout())}
          className="px-4 py-2 rounded shadow bg-blue-500 text-white"
        >
          Logout
        </button>
      </div>
    </BaseLayout>
  )
}

export default Dashboard