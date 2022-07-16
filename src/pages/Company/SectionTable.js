import React from 'react'
import { Table } from 'antd'

const SectionTable = () => {

  const columns = [
    {
      title: 'Company',
      dataIndex: 'company_name',
      key: 'company_name',
      width: 150,
    },
    {
      title: 'Status',
      dataIndex: 'company_status',
      key: 'company_status',
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