import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Space, Table, Modal } from 'antd'
import { DeleteOutlined, EditOutlined, KeyOutlined } from '@ant-design/icons'

import { titleCase } from '../../utils/text'
import { requestDeleteUser, requestListUser } from '../../redux/master/action'

const { confirm } = Modal

const SectionTable = ({ handleShowModal }) => {
  const dispatch = useDispatch()
  const Auth = useSelector(state => state.Auth)
  const Master = useSelector(state => state.Master)

  const fetchList = useCallback((query) => {
    dispatch(requestListUser(query))
  }, [dispatch])

  const handleDelete = (query) => dispatch(requestDeleteUser(query))

  const initFetch = useCallback(() => {
    const payload = {
      endpoint: '/Users/getUsers',
      data: {
        "user_name": "",
        "user_email": "",
        "branch_id": "",
        "user_full_name": "",
        "status": "",
        "created_by": "",
        "updated_by": "",
        "user_token": Auth.token
      }
    }

    fetchList(payload)
  }, [Auth.token, fetchList])

  useEffect(() => {
    initFetch()
  }, [initFetch])

  useEffect(() => {
    Master.reload && initFetch()
  }, [Master.reload, initFetch])

  const columns = [
    {
      title: 'Username',
      dataIndex: 'user_name',
      key: 'user_name',
      width: 100,
    },
    {
      title: 'Fullname',
      dataIndex: 'user_full_name',
      key: 'user_full_name',
      width: 150,
    },
    {
      title: 'Email',
      dataIndex: 'user_email',
      key: 'user_email',
      width: 150,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: value => titleCase(value)
    },
    {
      title: 'Create by',
      dataIndex: 'created_by',
      key: 'created_by',
      width: 110,
    },
    {
      title: 'Create Date',
      dataIndex: 'created_date',
      key: 'created_date',
      width: 110,
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      width: 180,
      render: (data) => {
        return (
          <Space wrap>
            <Button
              type='primary'
              onClick={() => {
                const row = { ...data };
                row.user_password = '';
                handleShowModal('edit', row)
              }}
            >
              <EditOutlined />
            </Button>
            <Button
              onClick={() => handleShowModal('change_password', data)}
            >
              <KeyOutlined />
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
          endpoint: '/Users/deleteUsers',
          data: {
            "user_id": data['user_id'],
            "user_token": Auth.token
          }
        }

        handleDelete(payload)
      },
    })
  }

  return (
    <Table
      rowKey='user_id'
      columns={columns}
      scroll={{ x: 800 }}
      dataSource={Master.user.data}
      loading={Master.user.isLoading}
    />
  )
}

export default SectionTable