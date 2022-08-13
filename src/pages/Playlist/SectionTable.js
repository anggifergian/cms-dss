import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Space, Table, Modal, Input } from 'antd'
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'

import { requestDeletePlaylist, requestListPlaylist } from '../../redux/playlist/action'
import { titleCase } from '../../utils/text'

const { confirm } = Modal

const SectionTable = ({ handleShowModal }) => {
  const dispatch = useDispatch()
  const Auth = useSelector(state => state.Auth)
  const Playlist = useSelector(state => state.Playlist)

  const [state, setState] = useState({
    query: {
      "branch_id": Auth.user.branch_id,
      "company_id": Auth.user.company_id,
      "region_id": Auth.user.region_id,
      "playlist_name": "",
      "position_id": 0,
      "resource_id": "",
      "start_date": "",
      "end_date": "",
      "sort": "",
      "status": "",
      "created_by": "",
      "created_date": "",
      "updated_by": "",
      "updated_date": "",
      "user_token": Auth.token
    }
  })

  const fetchList = useCallback((query) => {
    dispatch(requestListPlaylist(query))
  }, [dispatch])

  const handleDelete = (query) => dispatch(requestDeletePlaylist(query))

  const initFetch = useCallback(() => {
    const query = {
      endpoint: '/playlist/getPlaylist',
      data: state.query
    }

    fetchList(query)
  }, [state.query, fetchList])

  useEffect(() => {
    initFetch()
  }, [initFetch])

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
      title: 'Playlist',
      dataIndex: 'playlist_name',
      key: 'playlist_name',
      width: 150,
      ...getColumnSearchProps('playlist_name')
    },
    {
      title: 'Branch',
      dataIndex: 'branch_name',
      key: 'branch_name',
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
          endpoint: '/playlist/deletePlaylist',
          data: {
            "playlist_id": data['playlist_id'],
            "user_token": Auth.token
          }
        }

        handleDelete(payload)
      },
    })
  }

  return (
    <Table
      rowKey='playlist_id'
      columns={columns}
      scroll={{ x: 800 }}
      dataSource={Playlist.list.data}
      loading={Playlist.list.isLoading}
    />
  )
}

export default SectionTable