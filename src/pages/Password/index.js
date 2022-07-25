import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Row, Col, Button } from 'antd';

import { BaseLayout, Title } from '../../containers'
import { requestChangePassword } from '../../redux/master/action';

const ForgotPassword = () => {
  const dispatch = useDispatch()
  const Auth = useSelector(state => state.Auth)
  const Master = useSelector(state => state.Master)
  const [form] = Form.useForm()

  useEffect(() => {
    form.resetFields()
  }, [form, Master.reload])

  const [disabledSave, setDisabledSave] = useState(true)

  const handleFormChange = () => {
    const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
    setDisabledSave(hasErrors);
  }

  const fetchSubmit = query => dispatch(requestChangePassword(query))

  const handleSubmit = (values) => {
    const formValues = { ...values }
    delete formValues.confirm

    const payload = {
      endpoint: '/Users/changeUserPassword',
      data: {
        ...formValues,
        user_id: Auth.user.profile.id,
        user_name: Auth.user.profile.name,
      }
    }

    fetchSubmit(payload)
  }

  return (
    <BaseLayout>
      <Row
        align="bottom"
        justify="space-between"
        style={{ marginBottom: 20 }}
      >
        <Title label="Change Password" />
      </Row>

      <div className='w-full bg-white p-4 rounded-md shadow-sm'>
        <Form
          onFieldsChange={handleFormChange}
          form={form}
          name='forgotPasswordForm'
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
                  Update
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </div>
    </BaseLayout>
  )
}

export default ForgotPassword