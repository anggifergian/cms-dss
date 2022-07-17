import React, { useCallback, useEffect } from 'react'
import { Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import { requestListPosition } from '../../redux/master/action'

const SectionTable = () => {
  const dispatch = useDispatch()
  const Auth = useSelector(state => state.Auth)
  const Master = useSelector(state => state.Master)

  const fetchList = useCallback((query) => {
    dispatch(requestListPosition(query))
  }, [dispatch])

  useEffect(() => {
    const query = {}

    fetchList(query)
  }, [Master.reload, Auth.token, fetchList])

  const columns = [
    {
      title: 'Position',
      dataIndex: 'position_name',
      key: 'position_name',
      width: 150,
    },
    {
      title: 'Status',
      dataIndex: 'position_status',
      key: 'position_status',
      width: 150,
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      width: 150,
    },
  ]

  return (
    <Table
      columns={columns}
    />
  )
}

export default SectionTable