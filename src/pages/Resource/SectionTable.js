import React, { useCallback, useEffect } from 'react'
import { Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import { requestListResource } from '../../redux/master/action'

const SectionTable = () => {
  const dispatch = useDispatch()
  const Auth = useSelector(state => state.Auth)
  const Master = useSelector(state => state.Master)

  const fetchList = useCallback((query) => {
    dispatch(requestListResource(query))
  }, [dispatch])

  useEffect(() => {
    const query = {}

    fetchList(query)
  }, [Master.reload, Auth.token, fetchList])

  const columns = [
    {
      title: 'Recourse',
      dataIndex: 'resource_name',
      key: 'resource_name',
      width: 150,
    },
    {
      title: 'Status',
      dataIndex: 'resource_status',
      key: 'resource_status',
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