import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Form, Input, Row, Col, Button } from 'antd'

import { Title } from '../../../containers'
import { requestChangePassword } from '../../../redux/master/action'

const ChangePassword = ({ visible, onClose, data }) => {
  const dispatch = useDispatch()
  const Master = useSelector(state => state.Master)
  const [form] = Form.useForm()

  const [disabledSave, setDisabledSave] = useState(true);

  useEffect(() => {
    form.resetFields()
  }, [form, visible])

  const closeModal = useCallback(() => {
    onClose()
  }, [onClose])

  useEffect(() => {
    Master.reload && onClose()
  }, [Master.reload, onClose])

  const fetchSubmit = query => dispatch(requestChangePassword(query))

  const handleSubmit = (values) => {
    const formValues = {...values}
    delete formValues.confirm

    const payload = {
      endpoint: '/Users/changeUserPassword',
      data: {
        ...formValues,
        user_id: data["user_id"],
        user_name: data["user_name"],
      }
    }

    fetchSubmit(payload)
  }

  const handleFormChange = () => {
    const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
    setDisabledSave(hasErrors);
  }

  return (
    <Modal
      title={<Title label="Change Password" />}
      visible={visible}
      onCancel={closeModal}
      width={600}
      footer={null}
    >
      <Form
        onFieldsChange={handleFormChange}
        form={form}
        name='changePasswordForm'
        onFinish={handleSubmit}
        layout='vertical'
        autoComplete='off'
      >
        <Form.Item
          name="user_password"
          label="Old Password"
          rules={[
            {
              required: true,
              message: 'Please input old password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="new_user_password"
          label="New Password"
          rules={[
            {
              required: true,
              message: 'Please input new password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['new_user_password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm new password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('new_user_password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject(new Error('The two passwords that you entered do not match!'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item shouldUpdate noStyle>
          <Row align="middle" justify="end">
            <Col>
              <Button
                id="btn-create-submit"
                type="primary"
                htmlType="submit"
                disabled={disabledSave}
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

export default ChangePassword