import React, { useCallback, useEffect } from 'react'
import { Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import { requestListBranch } from '../../redux/master/action'

const SectionTable = () => {
  const dispatch = useDispatch()
  const Auth = useSelector(state => state.Auth)
  const Master = useSelector(state => state.Master)

  const fetchList = useCallback((query) => {
    dispatch(requestListBranch(query))
  }, [dispatch])

  useEffect(() => {
    const query = {}

    fetchList(query)
  }, [Master.reload, Auth.token, fetchList])

  const columns = [
    {
      title: 'Branch',
      dataIndex: 'branch_name',
      key: 'branch_name',
      width: 150,
    },
    {
      title: 'Status',
      dataIndex: 'branch_status',
      key: 'branch_status',
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