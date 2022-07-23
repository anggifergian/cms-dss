import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Input, Modal, Select, Row, Col, Button, DatePicker } from 'antd'

import { Title } from '../../../containers'
import { requestCreatePlaylist } from '../../../redux/playlist/action'
import { requestListBranch, requestListPosition, requestListResource } from '../../../redux/master/action'

const CreateModal = ({ visible, onClose }) => {
  const dispatch = useDispatch()
  const Auth = useSelector(state => state.Auth)
  const Playlist = useSelector(state => state.Playlist)
  const Master = useSelector(state => state.Master)
  const [form] = Form.useForm()

  const closeModal = useCallback(() => {
    form.resetFields()
    onClose()
  }, [onClose, form])

  useEffect(() => {
    Playlist.reload && closeModal()
  }, [Playlist.reload, closeModal])

  const fetchCreate = query => dispatch(requestCreatePlaylist(query))
  const fetchBranch = query => dispatch(requestListBranch(query))
  const fetchPosition = query => dispatch(requestListPosition(query))
  const fetchResource = query => dispatch(requestListResource(query))

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

  const initOptionResource = () => {
    const query = {
      "resource_name": "",
      "type": "",
      "thumbnail": "",
      "file": "",
      "duration": "",
      "stretch": "",
      "order": "",
      "status": "active",
      "created_by": "",
      "created_date": "",
      "updated_by": "",
      "updated_date": "",
      "user_token": Auth.token
    }

    fetchResource(query)
  }

  const handleSubmit = (values) => {
    const payload = {
      endpoint: '/playlist/addNewPlaylist',
      data: {
        ...values,
        start_date: values.start_date.format('YYYY-MM-DD'),
        end_date: values.end_date.format('YYYY-MM-DD'),
        user_token: Auth.token,
      }
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

        <Form.Item
          name='resource_id'
          label='Resource'
        >
          <Select
            onFocus={() => !Master.resource.options && initOptionResource()}
            options={Master.resource.options}
            filterOption={(input, option) =>
              option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            showSearch
            allowClear
          />
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
          <DatePicker format='YYYY-MM-DD' />
        </Form.Item>

        <Form.Item
          name="end_date"
          label="End Date"
          {...dateConfig}
        >
          <DatePicker format='YYYY-MM-DD' />
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
  )
}

export default CreateModal