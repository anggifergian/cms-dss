import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Space, Table, Modal } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

import { titleCase } from '../../utils/text'
import { requestDeletePromo, requestListPromo } from '../../redux/master/action'

const { confirm } = Modal

const SectionTable = ({ handleShowModal }) => {
  const dispatch = useDispatch()
  const Auth = useSelector(state => state.Auth)
  const Master = useSelector(state => state.Master)

  const fetchList = useCallback(query => {
    dispatch(requestListPromo(query))
  }, [dispatch])

  const handleDelete = (query) => dispatch(requestDeletePromo(query))

  const initFetch = useCallback(() => {
    const query = {
      "branch_id": 0,
      "tittle": "",
      "file": "",
      "description": "",
      "popup": "",
      "popup_description": "",
      "start_date": "",
      "end_date": "",
      "status": "",
      "created_date": "",
      "created_by": "",
      "updated_date": "",
      "updated_by": "",
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
      title: 'No Urut',
      dataIndex: 'promo_id',
      key: 'promo_id',
      width: 120,
    },
    {
      title: 'Branch',
      dataIndex: 'branch_name',
      key: 'branch_name',
      width: 150,
    },
    {
      title: 'Title',
      dataIndex: 'tittle',
      key: 'tittle',
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
      width: 100,
      render: value => titleCase(value)
    },
    {
      title: 'Create by',
      dataIndex: 'created_by',
      key: 'created_by',
      width: 150,
    },
    {
      title: 'Create Date',
      dataIndex: 'created_date',
      key: 'created_date',
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
          "promo_id": data['promo_id'],
          "user_token": Auth.token
        }

        handleDelete(payload)
      },
    })
  }

  return (
    <Table
      rowKey='promo_id'
      columns={columns}
      scroll={{ x: 800 }}
      dataSource={Master.promo.data}
      loading={Master.promo.isLoading}
    />
  )
}

export default SectionTable