import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Modal, Select, Input, Row, Col, Button } from 'antd'

import { Title } from '../../../containers'
import { requestCreateUser, requestListBranch, requestListCompany, requestListRegion } from '../../../redux/master/action'

const EditModal = ({ visible, onClose, data }) => {
  const dispatch = useDispatch()
  const Auth = useSelector(state => state.Auth)
  const Master = useSelector(state => state.Master)
  const [form] = Form.useForm()

  const [state, setState] = useState({
    form: {
      company_id: '',
      region_id: '',
    }
  })

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

  const initOptionCompany = useCallback(() => {
    const query = {
      "company_name": "",
      "company_address": "",
      "company_phone": "",
      "company_email": "",
      "status": "",
      "created_by": "",
      "created_date": "",
      "user_token": Auth.token
    }

    dispatch(requestListCompany(query))
  }, [dispatch, Auth.token])

  const initOptionRegion = useCallback((company_id = '') => {
    const query = {
      "region_name": "",
      "company_id": company_id,
      "status": "active",
      "created_by": "",
      "created_date": "",
      "user_token": Auth.token
    }

    dispatch(requestListRegion(query))
  }, [dispatch, Auth.token])

  const initOptionBranch = useCallback((region_id = '') => {
    const query = {
      "branch_id": Auth.user.branch_id,
      "branch_name": "",
      "region_id": region_id,
      "status": "active",
      "created_by": "",
      "created_date": "",
      "user_token": Auth.token
    }

    dispatch(requestListBranch(query))
  }, [dispatch, Auth.token, Auth.user.branch_id])

  useEffect(() => {
    initOptionCompany()
    initOptionRegion(data.company_id)
    initOptionBranch(data.region_id)
  }, [
    initOptionCompany,
    initOptionRegion,
    initOptionBranch,
    data.company_id,
    data.region_id,
  ])

  const handleSubmit = (values) => {
    const payload = {
      endpoint: '/Users/updateUsers',
      data: {
        ...values,
        user_id: values['user_id'],
        user_token: Auth.token,
        region_id: Auth.user.region_id,
        company_id: Auth.user.company_id,
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

  const resetForm = (fieldType) => {
    const resetedFields = { branch_id: '' }

    if (fieldType === 'company') {
      resetedFields['region_id'] = ''
    }

    form.setFieldsValue(resetedFields)
  }

  const onFilterOption = (input, option) => {
    return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
          name='company_id'
          label='Company'
          {...itemConfig}
        >
          <Select
            showSearch
            allowClear
            options={Master.company.options}
            filterOption={onFilterOption}
            onChange={(value) => {
              resetForm('company')
              initOptionRegion(value)
            }}
          />
        </Form.Item>

        <Form.Item
          noStyle
          shouldUpdate
        >
          {({ getFieldValue }) => (
            <Form.Item
              name="region_id"
              label="Region"
              {...itemConfig}
            >
              <Select
                showSearch
                allowClear
                options={Master.region.options}
                filterOption={onFilterOption}
                disabled={!getFieldValue('company_id')}
                onChange={(value) => {
                  resetForm()
                  initOptionBranch(value)
                }}
              />
            </Form.Item>
          )}
        </Form.Item>

        <Form.Item
          noStyle
          shouldUpdate
        >
          {({ getFieldValue }) => (
            <Form.Item
              name="branch_id"
              label="Branch"
              {...itemConfig}
            >
              <Select
                showSearch
                allowClear
                options={Master.branch.options}
                filterOption={onFilterOption}
                disabled={!getFieldValue('region_id')}
              />
            </Form.Item>
          )}
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