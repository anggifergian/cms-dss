import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Space, Table, Modal } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

import { requestDeleteDevice, requestListDevice } from '../../redux/master/action'

const { confirm } = Modal

const SectionTable = ({ handleShowModal }) => {
  const dispatch = useDispatch()
  const Auth = useSelector(state => state.Auth)
  const Master = useSelector(state => state.Master)

  const fetchList = useCallback((query) => {
    dispatch(requestListDevice(query))
  }, [dispatch])

  const handleDelete = (query) => dispatch(requestDeleteDevice(query))

  const initFetch = useCallback(() => {
    const query = {
      "device_name": "",
      "status": "",
      "created_by": "",
      "created_date": "",
      "updated_by": "",
      "updated_date": "",
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
      title: 'Device',
      dataIndex: 'device_name',
      key: 'device_name',
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
          endpoint: '/device/deleteDevice',
          data: {
            "device_id": data['device_id'],
            "user_token": Auth.token
          }
        }

        handleDelete(payload)
      },
    })
  }

  return (
    <Table
      rowKey='device_id'
      columns={columns}
      dataSource={Master.device.data}
      loading={Master.device.isLoading}
    />
  )
}

export default SectionTable