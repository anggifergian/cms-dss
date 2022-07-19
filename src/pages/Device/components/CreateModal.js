import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Form, Input, Row, Col, Button } from 'antd'

import { Title } from '../../../containers'
import { requestCreateDevice } from '../../../redux/master/action'

const CreateModal = ({ visible, onClose }) => {
  const dispatch = useDispatch()
  const Auth = useSelector(state => state.Auth)
  const Master = useSelector(state => state.Master)
  const [form] = Form.useForm()

  const closeModal = useCallback(() => {
    form.resetFields()
    onClose()
  }, [onClose, form])

  useEffect(() => {
    Master.reload && closeModal()
  }, [Master.reload, closeModal])

  const fetchCreate = query => dispatch(requestCreateDevice(query))

  const handleSubmit = (values) => {
    const payload = {
      endpoint: '/device/addNewDevice',
      data: {
        ...values,
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

  return (
    <Modal
      title={<Title label="Form Device" />}
      visible={visible}
      onCancel={closeModal}
      width={600}
      footer={null}
    >
      <Form
        {...formItemLayout}
        form={form}
        name='deviceCreateModal'
        onFinish={handleSubmit}
        layout='horizontal'
        autoComplete='off'
      >
        <Form.Item
          name="device_name"
          label="Device name"
        >
          <Input />
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