import React from 'react'
import { Table } from 'antd'

const SectionTable = () => {
  const columns = [
    {
      title: 'No Urut',
      dataIndex: 'no_urut',
      key: 'no_urut',
      width: 150,
    },
    {
      title: 'Branch',
      dataIndex: 'branch',
      key: 'branch',
      width: 150,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: 150,
    },
    {
      title: 'Start date',
      dataIndex: 'start_date',
      key: 'start_date',
      width: 150,
    },
    {
      title: 'End date',
      dataIndex: 'end_date',
      key: 'end_date',
      width: 150,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
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
      scroll={{ x: 800 }}
    />
  )
}

export default SectionTable