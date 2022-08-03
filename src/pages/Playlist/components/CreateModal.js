import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Input, Modal, Select, Row, Col, Button, DatePicker } from 'antd'

import { Title } from '../../../containers'
import { requestCreatePlaylist } from '../../../redux/playlist/action'
import { requestListBranch, requestListPosition, } from '../../../redux/master/action'
import AddResource from './AddResource'

const CreateModal = ({ visible, onClose }) => {
  const dispatch = useDispatch()
  const Auth = useSelector(state => state.Auth)
  const Playlist = useSelector(state => state.Playlist)
  const Master = useSelector(state => state.Master)
  const [form] = Form.useForm()

  const [state, setState] = useState({
    isModalVisible: false,
    resource_list: []
  })

  const handleCloseModal = (data) => {
    console.log('resource_list', data)

    setState({
      ...state,
      isModalVisible: false,
      resource_list: data || []
    })
  }

  const handleOpenModal = () => {
    setState({
      ...state,
      isModalVisible: true
    })
  }

  const resetState = useCallback(() => {
    setState({
      isModalVisible: false,
      resource_list: []
    })
  }, [setState])

  const closeModal = useCallback(() => {
    resetState()
    form.resetFields()
    onClose()
  }, [onClose, form, resetState])

  useEffect(() => {
    Playlist.reload && closeModal()
  }, [Playlist.reload, closeModal])

  const fetchCreate = query => dispatch(requestCreatePlaylist(query))
  const fetchBranch = query => dispatch(requestListBranch(query))
  const fetchPosition = query => dispatch(requestListPosition(query))

  const initOptionBranch = () => {
    const query = {
      "branch_id": Auth.user.branch_id,
      "branch_name": "",
      "region_id": "",
      "status": "active",
      "created_by": "",
      "created_date": "",
      "user_token": Auth.token
    }

    fetchBranch(query)
  }

  const initOptionPosition = () => {
    const query = {
      "device_id": "",
      "box": "",
      "x_pos": "",
      "y_pos": "",
      "width": "",
      "height": "",
      "measurement": "",
      "status": "active",
      "created_by": "",
      "created_date": "",
      "updated_by": "",
      "updated_date": "",
      "user_token": Auth.token
    }

    fetchPosition(query)
  }

  const handleSubmit = (values) => {
    const payload = {
      endpoint: '/playlist/addNewPlaylist',
      data: {
        ...values,
        start_date: values.start_date.format('YYYY-MM-DD'),
        end_date: values.end_date.format('YYYY-MM-DD'),
        user_token: Auth.token,
        region_id: Auth.user.region_id,
        company_id: Auth.user.company_id,
        resource_list: []
      }
    }

    if (state.resource_list.length) {
      const resourceMap = state.resource_list.map((item, index) => ({
        resource_id: item.value,
        order: index + 1
      }))

      payload.data.resource_list = resourceMap
    }

    fetchCreate(payload)
  }

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    }
  }

  const dateConfig = {
    rules: [
      {
        required: true,
        message: 'Please select time!',
      },
    ],
  }

  return (
    <>
      <Modal
        title={<Title label="Form Playlist" />}
        visible={visible}
        onCancel={closeModal}
        width={600}
        footer={null}
      >
        <Form
          {...formItemLayout}
          form={form}
          name='playlistCreateModal'
          onFinish={handleSubmit}
          layout='horizontal'
          autoComplete='off'
        >
          <Form.Item
            name='branch_id'
            label='Branch'
          >
            <Select
              onFocus={() => !Master.branch.options && initOptionBranch()}
              options={Master.branch.options}
              filterOption={(input, option) =>
                option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              showSearch
              allowClear
            />
          </Form.Item>

          <Form.Item
            name='position_id'
            label='Position'
          >
            <Select
              onFocus={() => !Master.position.options && initOptionPosition()}
              options={Master.position.options}
              filterOption={(input, option) =>
                option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              showSearch
              allowClear
            />
          </Form.Item>

          <Form.Item>
            <Row align='middle'>
              <Col span={6}>
                <p
                  style={{
                    textAlign: 'right',
                    paddingRight: 8,
                    marginBottom: 0
                  }}
                >
                  Resource:
                </p>
              </Col>
              <Col span={18}>
                <Button
                  type={state.resource_list.length ? 'primary' : 'default'}
                  onClick={handleOpenModal}
                  style={{ width: 100 }}
                >
                  {state.resource_list.length ? 'Change' : 'Add'}
                </Button>

                {state.resource_list.length ? (
                  <div className='pt-4 grid grid-cols-1 gap-2'>
                    {state.resource_list.map((item, index) => (
                      <div className='py-1 pl-3 px-2 rounded border border-opacity-40'>
                        <span className='pr-2'>{index + 1}</span>
                        <span>{item.label}</span>
                      </div>
                    ))}
                  </div>
                ) : null}
              </Col>
            </Row>
          </Form.Item>

          <Form.Item
            name="playlist_name"
            label="Playlist Name"
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="start_date"
            label="Start Date"
            {...dateConfig}
          >
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>

          <Form.Item
            name="end_date"
            label="End Date"
            {...dateConfig}
          >
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>

          <Form.Item noStyle>
            <Row align="middle" justify="end">
              <Col>
                <Button
                  id="btn-create-submit"
                  type="primary"
                  htmlType="submit"
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Modal>
      <AddResource
        visible={state.isModalVisible}
        onClose={handleCloseModal}
        data={state.resource_list}
      />
    </>
  )
}

export default CreateModal