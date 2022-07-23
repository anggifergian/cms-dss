import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Popover } from 'antd'
import { DownOutlined } from '@ant-design/icons'

import { titleCase } from '../../utils/text'
import { logout } from '../../redux/auth/action'
import { Link } from 'react-router-dom'
import { isAdmin } from '../../utils/helpers'

const AppHeader = () => {
  const dispatch = useDispatch()
  const Auth = useSelector(state => state.Auth)

  const content = (
    <div className='flex flex-col gap-y-4'>
      {isAdmin() && (
        <Link to='/profile' className='w-28'>
          <span className='text-gray-600 hover:text-gray-500'>User</span>
        </Link>
      )}
      <div onClick={() => dispatch(logout())} className='w-28'>
        <span className='text-gray-600 hover:text-gray-500'>Sign Out</span>
      </div>
    </div>
  )

  return (
    <header className="px-12 py-4 fixed inset-x-0 top-0 bg-white z-50 shadow flex justify-between items-center">
      <div className='flex justify-center items-center'>
        <h3 className='m-0 text-lg font-bold text-blue-600'>CMS DSS</h3>
      </div>

      <div className='relative inline-block text-left'>
        <Popover placement='bottom' content={content} trigger="click">
          <div className='flex items-center group cursor-pointer'>
            <span className='mr-2 text-gray-600 group-hover:text-gray-500 font-semibold'>{titleCase(Auth.user.profile.name)}</span>
            <DownOutlined className='text-gray-600 group-hover:text-gray-500' />
          </div>
        </Popover>
      </div>
    </header>
  )
}

export default AppHeader