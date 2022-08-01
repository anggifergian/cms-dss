import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Space, Table, Modal, Input } from 'antd'
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'

import { titleCase } from '../../utils/text'
import { requestDeletePromo, requestListPromo } from '../../redux/master/action'

const { confirm } = Modal

const SectionTable = ({ handleShowModal }) => {
  const dispatch = useDispatch()
  const Auth = useSelector(state => state.Auth)
  const Master = useSelector(state => state.Master)

  const [state, setState] = useState({
    query: {
      "branch_id": Auth.user.branch_id,
      "company_id": Auth.user.company_id,
      "region_id": Auth.user.region_id,
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
  })

  const fetchList = useCallback(query => {
    dispatch(requestListPromo(query))
  }, [dispatch])

  const handleDelete = (query) => dispatch(requestDeletePromo(query))

  const initFetch = useCallback(() => {
    fetchList(state.query)
  }, [state.query, fetchList])

  useEffect(() => {
    initFetch()
  }, [initFetch])

  useEffect(() => {
    Master.reload && initFetch()
  }, [Master.reload, initFetch])


  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div className='p-4'>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters, dataIndex, confirm)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
  })

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm()
    setState({
      ...state,
      query: {
        ...state.query,
        [dataIndex]: selectedKeys[0]
      }
    })
  }

  const handleReset = (clearFilters, dataIndex, confirm) => {
    clearFilters()
    confirm()
    setState({
      ...state,
      query: {
        ...state.query,
        [dataIndex]: ''
      }
    })
  }

  const columns = [
    {
      title: 'No Urut',
      dataIndex: 'promo_id',
      key: 'promo_id',
      width: 80,
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
      ...getColumnSearchProps('tittle'),
      render: (value, record) => {
        return (
          <div>
            <p>{value}</p>
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
      title: 'Start date',
      dataIndex: 'start_date',
      key: 'start_date',
      width: 110,
    },
    {
      title: 'End date',
      dataIndex: 'end_date',
      key: 'end_date',
      width: 110,
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