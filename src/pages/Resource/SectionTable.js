import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Space, Table, Modal } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

import { titleCase } from '../../utils/text'
import { requestDeleteResource, requestListResource } from '../../redux/master/action'

const { confirm } = Modal

const SectionTable = ({ handleShowModal }) => {
  const dispatch = useDispatch()
  const Auth = useSelector(state => state.Auth)
  const Master = useSelector(state => state.Master)

  const fetchList = useCallback((query) => {
    dispatch(requestListResource(query))
  }, [dispatch])

  const handleDelete = (query) => dispatch(requestDeleteResource(query))

  const initFetch = useCallback(() => {
    const query = {
      "resource_name": "",
      "type": "",
      "thumbnail": "",
      "file": "",
      "duration": "",
      "stretch": "",
      "order": "",
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
      title: 'Resource',
      dataIndex: 'resource_name',
      key: 'resource_name',
      width: 150,
      render: (value, record) => {
        return (
          <div>
            <p>{value}</p>

            {record['thumbnail'] && (
              <img
                alt='promo'
                className='w-full object-contain h-28 rounded pb-2'
                src={`data:image/png;base64,${record['thumbnail']}`}
              />
            )}

            {record['file'] && (
              <button
                onClick={() => handleShowModal('preview', { file_name: record['file'] })}
                className='text-left underline hover:text-blue-400'
              >
                <span>Preview</span>
              </button>
            )}
          </div>
        )
      }
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      width: 100,
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
          endpoint: '/resource/deleteResource',
          data: {
            "resource_id": data['resource_id'],
            "user_token": Auth.token
          }
        }

        handleDelete(payload)
      },
    })
  }

  return (
    <Table
      rowKey='resource_id'
      columns={columns}
      scroll={{ x: 800 }}
      dataSource={Master.resource.data}
      loading={Master.resource.isLoading}
    />
  )
}

export default SectionTable