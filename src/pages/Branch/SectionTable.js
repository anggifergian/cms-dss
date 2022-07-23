import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Space, Table, Modal } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

import { titleCase } from '../../utils/text'
import { requestDeleteBranch, requestListBranch } from '../../redux/master/action'

const { confirm } = Modal

const SectionTable = ({ handleShowModal }) => {
  const dispatch = useDispatch()
  const Auth = useSelector(state => state.Auth)
  const Master = useSelector(state => state.Master)

  const fetchList = useCallback((query) => {
    dispatch(requestListBranch(query))
  }, [dispatch])

  const handleDelete = (query) => dispatch(requestDeleteBranch(query))

  const initFetch = useCallback(() => {
    const query = {
      "branch_id": Auth.user.branch_id,
      "branch_name": "",
      "region_id": "",
      "status": "",
      "created_by": "",
      "created_date": "",
      "user_token": Auth.token
    }

    fetchList(query)
  }, [Auth.token, Auth.user.branch_id, fetchList])

  useEffect(() => {
    initFetch()
  }, [initFetch])

  useEffect(() => {
    Master.reload && initFetch()
  }, [Master.reload, initFetch])

  const columns = [
    {
      title: 'Branch',
      dataIndex: 'branch_name',
      key: 'branch_name',
      width: 150,
    },
    {
      title: 'Region',
      dataIndex: 'region_name',
      key: 'region_name',
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
      width: 140,
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
          endpoint: '/branch/deleteBranch',
          data: {
            "branch_id": data['branch_id'],
            "user_token": Auth.token
          }
        }

        handleDelete(payload)
      },
    })
  }

  return (
    <Table
      rowKey='branch_id'
      columns={columns}
      scroll={{ x: 800 }}
      dataSource={Master.branch.data}
      loading={Master.branch.isLoading}
    />
  )
}

export default SectionTable