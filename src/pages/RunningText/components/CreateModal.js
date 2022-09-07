import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Form, Input, Row, Select, DatePicker, Col, Button } from 'antd'

import { Title } from '../../../containers'
import { requestCreateRunningText, requestListCompany, requestListRegion, requestListBranch } from '../../../redux/master/action'

const CreateModal = ({ visible, onClose }) => {
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

  const fetchCreate = query => dispatch(requestCreateRunningText(query))
  const fetchCompany = query => dispatch(requestListCompany(query))
  const fetchRegion = query => dispatch(requestListRegion(query))
  const fetchBranch = query => dispatch(requestListBranch(query))

  const initOptionCompany = () => {
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

    fetchCompany(query)
  }

  const initOptionRegion = (company_id = '') => {
    const query = {
      "region_id": Auth.user.region_id,
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
      endpoint: '',
      data: {
        ...values,
        start_date: '',
        end_date: '',
        user_token: Auth.token
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

  const dateConfig = {
    rules: [
      {
        required: true,
        message: 'Please select time!',
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

  return (
    <Modal
      title={<Title label="Form Running Text" />}
      visible={visible}
      onCancel={closeModal}
      width={600}
      footer={null}
    >
      <Form
        {...formItemLayout}
        form={form}
        name='runningTextCreateModal'
        onFinish={handleSubmit}
        layout='horizontal'
        autoComplete='off'
      >
        <Form.Item
          name='company_id'
          label='Company'
        >
          <Select
            showSearch
            allowClear
            options={Master.company.options}
            filterOption={onFilterOption}
            onChange={(value) => resetForm(value, 'company')}
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
            >
              <Select
                showSearch
                allowClear
                options={Master.region.options}
                filterOption={onFilterOption}
                disabled={!getFieldValue('company_id')}
                onChange={(value) => resetForm(value, 'region')}
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
          name="tittle"
          label="Running Text"
          rules={[
            { required: true, message: 'Required' }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="start_date"
          label="Start Date"
          {...dateConfig}
        >
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item
          name="end_date"
          label="End Date"
          {...dateConfig}
        >
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
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
                loading={Master.promo.isLoading}
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