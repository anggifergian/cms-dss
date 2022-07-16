import React from 'react'
import { Table } from 'antd'

const SectionTable = () => {
  const columns = [
    {
      title: 'Device',
      dataIndex: 'device_name',
      key: 'device_name',
      width: 150,
    },
    {
      title: 'Status',
      dataIndex: 'device_status',
      key: 'device_status',
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