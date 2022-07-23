import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Space, Table, Modal } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

import { requestDeletePlaylist, requestListPlaylist } from '../../redux/playlist/action'
import { titleCase } from '../../utils/text'

const { confirm } = Modal

const SectionTable = ({ handleShowModal }) => {
  const dispatch = useDispatch()
  const Auth = useSelector(state => state.Auth)
  const Playlist = useSelector(state => state.Playlist)

  const fetchList = useCallback((query) => {
    dispatch(requestListPlaylist(query))
  }, [dispatch])

  const handleDelete = (query) => dispatch(requestDeletePlaylist(query))

  const initFetch = useCallback(() => {
    const query = {
      endpoint: '/playlist/getPlaylist',
      data: {
        "branch_id": Auth.user.branch_id,
        "playlist_name": "",
        "position_id": "",
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
    }

    fetchList(query)
  }, [Auth.token, Auth.user.branch_id, fetchList])

  useEffect(() => {
    initFetch()
  }, [initFetch])

  useEffect(() => {
    Playlist.reload && initFetch()
  }, [Playlist.reload, initFetch])

  const columns = [
    {
      title: 'Playlist',
      dataIndex: 'playlist_name',
      key: 'playlist_name',
      width: 150,
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