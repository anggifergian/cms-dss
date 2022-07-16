import React from 'react'
import { Table } from 'antd'

const SectionTable = () => {
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