import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Space, Table, Modal } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

import { titleCase } from '../../utils/text'
import { requestDeleteRegion, requestListRegion } from '../../redux/master/action'

const { confirm } = Modal

const SectionTable = ({ handleShowModal }) => {
  const dispatch = useDispatch()
  const Auth = useSelector(state => state.Auth)
  const Master = useSelector(state => state.Master)

  const fetchList = useCallback((query) => {
    dispatch(requestListRegion(query))
  }, [dispatch])

  const handleDelete = (query) => dispatch(requestDeleteRegion(query))

  const initFetch = useCallback(() => {
    const query = {
      "region_name": "",
      "company_id": "",
      "status": "",
      "created_by": "",
      "created_date": "",
      "user_token": Auth.token
    }

    fetchList(query)
  }, [Auth.token, fetchList])

  useEffect(() => {
    initFetch()
  }, [initFetch])

  useEffect(() => {
    Master.reload && initFetch()
  }, [Master.reload, initFetch])

  const columns = [
    {
      title: 'Region',
      dataIndex: 'region_name',
      key: 'region_name',
      width: 150,
      render: value => titleCase(value)
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
      render: (data) => {
        return (
          <Space wrap>
            <Button
              type='primary'
              onClick={() => handleShowModal('edit', data)}
            >
              <EditOutlined />
            </Button>
            <Button
              danger
              onClick={() => showConfirm(data)}
            >
              <DeleteOutlined />
            </Button>
          </Space>
        )
      }
    },
  ]

  const showConfirm = (data) => {
    confirm({
      title: 'Are you sure want to delete?',
      onOk() {
        const payload = {
          "region_id": data['region_id'],
          "user_token": Auth.token
        }

        handleDelete(payload)
      },
    })
  }

  return (
    <Table
      rowKey='region_id'
      columns={columns}
      dataSource={Master.region.data}
      loading={Master.region.isLoading}
    />
  )
}

export default SectionTable