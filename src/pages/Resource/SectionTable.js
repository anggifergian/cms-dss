import React from 'react'
import { Table } from 'antd'

const SectionTable = () => {
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