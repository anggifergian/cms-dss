import React from 'react'
import { Table } from 'antd'

const SectionTable = () => {
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