import React from 'react'
import { Modal, Form, Input, Row, Col, Button } from 'antd'

import { Title } from '../../../containers'

const CreateModal = ({ visible, onClose }) => {
  const [form] = Form.useForm()

  const handleSubmit = (values) => {
    console.log('submitting...', values)
  }

  const closeModal = () => onClose()

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
      title={<Title label="Form Region" />}
      visible={visible}
      onCancel={closeModal}
      width={600}
      footer={null}
    >
      <Form
        {...formItemLayout}
        form={form}
        name='regionCreateModal'
        onFinish={handleSubmit}
        layout='horizontal'
        autoComplete='off'
      >
        <Form.Item label="Region name" name="company_name">
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