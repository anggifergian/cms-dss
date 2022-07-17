import React, { useCallback, useEffect } from 'react'
import { Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import { requestListRegion } from '../../redux/master/action'

const SectionTable = () => {
  const dispatch = useDispatch()
  const Auth = useSelector(state => state.Auth)
  const Master = useSelector(state => state.Master)

  const fetchList = useCallback((query) => {
    dispatch(requestListRegion(query))
  }, [dispatch])

  useEffect(() => {
    const query = {
      "region_name": "",
      "company_id": 1,
      "status": "",
      "created_by": "",
      "created_date": "",
      "user_token": Auth.token
    }

    fetchList(query)
  }, [Master.reload, Auth.token, fetchList])

  const columns = [
    {
      title: 'Region',
      dataIndex: 'region_name',
      key: 'region_name',
      width: 150,
    },
    {
      title: 'Status',
      dataIndex: 'region_status',
      key: 'region_status',
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