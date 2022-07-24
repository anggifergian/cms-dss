import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Input, Modal, Select, Row, Col, Button } from 'antd'

import { Title } from '../../../containers'
import { requestCreateUser, requestListBranch } from '../../../redux/master/action'

const CreateModal = ({ visible, onClose }) => {
  const dispatch = useDispatch()
  const Auth = useSelector(state => state.Auth)
  const Master = useSelector(state => state.Master)
  const [form] = Form.useForm()

  useEffect(() => {
    form.resetFields()
  }, [form, visible])

  const closeModal = useCallback(() => {
    onClose()
  }, [onClose])

  useEffect(() => {
    Master.reload && closeModal()
  }, [Master.reload, closeModal])

  const fetchCreate = (query) => dispatch(requestCreateUser(query))
  const fetchBranch = (query) => dispatch(requestListBranch(query))

  const initOption = () => {
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

  const handleSubmit = (values) => {
    const payload = {
      endpoint: '/Users/addNewUsers',
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
  }

  const itemConfig = {
    rules: [
      {
        required: true,
        message: 'Input required'
      },
    ],
  }

  return (
    <Modal
      title={<Title label="Form User" />}
      visible={visible}
      onCancel={closeModal}
      width={600}
      footer={null}
    >
      <Form
        {...formItemLayout}
        form={form}
        name='userCreateModal'
        onFinish={handleSubmit}
        layout='horizontal'
        autoComplete='off'
      >
        <Form.Item
          name="branch_id"
          label="Branch"
          {...itemConfig}
        >
          <Select
            onFocus={() => !Master.branch.options && initOption()}
            options={Master.branch.options}
            filterOption={(input, option) =>
              option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            showSearch
            allowClear
          />
        </Form.Item>

        <Form.Item
          name='user_name'
          label='Username'
          {...itemConfig}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name='user_full_name'
          label='Fullname'
          {...itemConfig}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name='user_email'
          label='Email'
          {...itemConfig}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name='user_password'
          label='Password'
          {...itemConfig}
        >
          <Input.Password
            size="large"
            placeholder="Password"
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