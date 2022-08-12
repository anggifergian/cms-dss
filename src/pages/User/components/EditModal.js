import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Modal, Select, Input, Row, Col, Button } from 'antd'

import { Title } from '../../../containers'
import { requestCreateUser, requestListBranch, requestListCompany, requestListRegion } from '../../../redux/master/action'

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

  const initOptionCompany = useCallback(() => {
    const query = {
      "company_id": Auth.user.company_id,
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
  }, [dispatch, Auth.token, Auth.user.company_id])

  const initOptionRegion = useCallback((company_id = '') => {
    const query = {
      "region_id": Auth.user.branch_id,
      "region_name": "",
      "company_id": company_id,
      "status": "active",
      "created_by": "",
      "created_date": "",
      "user_token": Auth.token
    }

    dispatch(requestListRegion(query))
  }, [dispatch, Auth.token, Auth.user.branch_id])

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

  const checkAllOption = (data, fields) => {
    fields.forEach(field => {
      if (data[field] === 'all') {
        data[field] = 0
      }
    })

    return data
  }

  const handleSubmit = (values) => {
    const payload = {
      endpoint: '/Users/updateUsers',
      data: {
        ...values,
        user_id: values['user_id'],
        user_token: Auth.token,
      }
    }

    payload.data = checkAllOption(payload.data, ['region_id', 'branch_id'])

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

  const resetForm = (value, fieldType) => {
    const resetedFields = { branch_id: '' }

    if (fieldType === 'company') {
      resetedFields['region_id'] = ''
    }

    if (fieldType === 'region' && value === 'all') {
      resetedFields.branch_id = 'all'
    }

    form.setFieldsValue(resetedFields)
  }

  const onFilterOption = (input, option) => {
    return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
  }

  const mapData = (data) => {
    data.region_id = data.region_id === 0 ? 'all' : data.region_id
    data.branch_id = data.branch_id === 0 ? 'all' :data.branch_id

    return data
  }

  const EditForm = ({ data }) => {
    const dataMapped = mapData(data)

    return (
      <Form
        {...formItemLayout}
        form={form}
        name='userEditModal'
        onFinish={handleSubmit}
        layout='horizontal'
        autoComplete='off'
        initialValues={dataMapped}
      >
        <Form.Item
          name='company_id'
          label='Company'
          {...itemConfig}
        >
          <Select
            showSearch
            allowClear
            loading={Master.company.isLoading}
            options={Master.company.options}
            filterOption={onFilterOption}
            onChange={(value) => {
              resetForm(value, 'company')
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
                loading={Master.region.isLoading}
                options={Master.region.options}
                filterOption={onFilterOption}
                disabled={!getFieldValue('company_id')}
                onChange={(value) => {
                  resetForm(value, 'region')
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
                loading={Master.branch.isLoading}
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