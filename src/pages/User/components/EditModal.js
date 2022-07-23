import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Modal, Select, Input, Row, Col, Button } from 'antd'

import { Title } from '../../../containers'
import { requestCreateUser, requestListBranch } from '../../../redux/master/action'

const EditModal = ({ visible, onClose, data }) => {
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
    Master.reload && onClose()
  }, [Master.reload, onClose])

  const fetchCreate = (query) => dispatch(requestCreateUser(query))
  const fetchBranch = useCallback(query => dispatch(requestListBranch(query)), [dispatch])

  useEffect(() => {
    const query = {
      "branch_id": Auth.user.branch_id,
      "branch_name": "",
      "region_id": "",
      "status": "active",
      "created_by": "",
      "created_date": "",
      "user_token": Auth.token
    }

    visible && fetchBranch(query)
  }, [visible, Auth.token, Auth.user.branch_id, fetchBranch])

  const handleSubmit = (values) => {
    const payload = {
      endpoint: '/Users/updateUsers',
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

  const EditForm = ({ data }) => {
    return (
      <Form
        {...formItemLayout}
        form={form}
        name='userEditModal'
        onFinish={handleSubmit}
        layout='horizontal'
        autoComplete='off'
        initialValues={data}
      >
        <Form.Item
          name="branch_id"
          label="Branch"
        // {...itemConfig}
        >
          <Select
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
    )
  }

  return (
    <Modal
      title={<Title label="Form User" />}
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