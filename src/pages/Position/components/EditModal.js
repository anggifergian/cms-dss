import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Form, Row, Col, Button, Select, Input } from 'antd'

import { Title } from '../../../containers'
import { requestCreatePosition, requestListDevice } from '../../../redux/master/action'

const EditModal = ({ visible, onClose, data }) => {
  const dispatch = useDispatch()
  const Auth = useSelector(state => state.Auth)
  const Master = useSelector(state => state.Master)
  const [form] = Form.useForm()

  useEffect(() => {
    form.resetFields()
  }, [visible, form])

  const closeModal = useCallback(() => {
    onClose()
  }, [onClose])

  useEffect(() => {
    Master.reload && closeModal()
  }, [Master.reload, closeModal])

  const fetchCreate = query => dispatch(requestCreatePosition(query))

  const fetchDevice = useCallback(query => dispatch(requestListDevice(query)), [dispatch])

  useEffect(() => {
    const query = {
      "device_name": "",
      "status": "active",
      "created_by": "",
      "created_date": "",
      "updated_by": "",
      "updated_date": "",
      "user_token": Auth.token
    }

    visible && fetchDevice(query)
  }, [visible, Auth.token, fetchDevice])

  const handleSubmit = (values) => {
    const payload = {
      endpoint: '/position/updatePosition',
      data: {
        ...values,
        status: data['status'],
        position_id: data['position_id'],
        user_token: Auth.token,
      }
    }

    fetchCreate(payload)
  }

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18 },
    }
  }

  const EditForm = ({ data }) => {
    return (
      <Form
        {...formItemLayout}
        form={form}
        name='branchCreateModal'
        onFinish={handleSubmit}
        layout='horizontal'
        autoComplete='off'
        initialValues={data}
      >
        <Form.Item
          name="device_id"
          label="Device"
        >
          <Select
            options={Master.device.options}
            filterOption={(input, option) =>
              option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            showSearch
            allowClear
          />
        </Form.Item>

        <Form.Item
          name="box"
          label="Box"
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="x_pos"
          label="X Pos"
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="y_pos"
          label="Y Pos"
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="width"
          label="Width"
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="height"
          label="Height"
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="measurement"
          label="Measurement"
        >
          <Select
            options={[
              { value: 'cm', label: 'cm' }
            ]}
            showSearch
            allowClear
          />
        </Form.Item>

        <Form.Item noStyle>
          <Row align="middle" justify="end">
            <Col>
              <Button
                id="btn-create-submit"
                type="primary"
                htmlType="submit"
              >
                Update
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    )
  }

  return (
    <Modal
      title={<Title label="Edit Position" />}
      visible={visible}
      onCancel={closeModal}
      width={600}
      footer={null}
    >
      <EditForm data={data} />
    </Modal>
  )
}

export default EditModal