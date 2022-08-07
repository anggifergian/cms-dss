import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Input, Modal, Select, Row, Col, Button } from 'antd'

import { Title } from '../../../containers'
import { requestCreateUser, requestListBranch, requestListCompany, requestListRegion } from '../../../redux/master/action'

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
  const fetchCompany = query => dispatch(requestListCompany(query))
  const fetchRegion = query => dispatch(requestListRegion(query))
  const fetchBranch = (query) => dispatch(requestListBranch(query))

  const initOptionCompany = () => {
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

    fetchCompany(query)
  }

  const initOptionRegion = (company_id = '') => {
    const query = {
      "region_name": "",
      "company_id": company_id,
      "status": "active",
      "created_by": "",
      "created_date": "",
      "user_token": Auth.token
    }

    fetchRegion(query)
  }

  const initOptionBranch = (region_id = '') => {
    const query = {
      "branch_id": Auth.user.branch_id,
      "branch_name": "",
      "region_id": region_id,
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
          name='company_id'
          label='Company'
          {...itemConfig}
        >
          <Select
            showSearch
            allowClear
            options={Master.company.options}
            filterOption={onFilterOption}
            onChange={() => resetForm('company')}
            onFocus={() => !Master.company.options && initOptionCompany()}
          />
        </Form.Item>

        <Form.Item
          noStyle
          shouldUpdate
        >
          {({ getFieldValue }) => (
            <Form.Item
              name='region_id'
              label='Region'
              {...itemConfig}
            >
              <Select
                showSearch
                allowClear
                options={Master.region.options}
                filterOption={onFilterOption}
                disabled={!getFieldValue('company_id')}
                onChange={resetForm}
                onFocus={() => initOptionRegion(getFieldValue('company_id'))}
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
                onFocus={() => initOptionBranch(getFieldValue('region_id'))}
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