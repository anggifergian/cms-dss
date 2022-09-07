import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Form, Select, DatePicker, Input, Row, Col, Button } from 'antd'
import moment from 'moment'

import { Title } from '../../../containers'
import { requestCreateRunningText, requestListBranch, requestListCompany, requestListRegion } from '../../../redux/master/action'
import { onFilterOption } from '../../../utils/antdUtil'

const EditModal = ({ visible, onClose, data }) => {
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
      "region_id": Auth.user.region_id,
      "region_name": "",
      "company_id": company_id,
      "status": "active",
      "created_by": "",
      "created_date": "",
      "user_token": Auth.token
    }

    dispatch(requestListRegion(query))
  }, [dispatch, Auth.token, Auth.user.region_id])

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
      endpoint: '',
      data: {
        ...values,
        start_date: '',
        end_date: '',
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

  const mapData = (data) => {
    data.start_date = moment(data.start_date)
    data.end_date = moment(data.end_date)

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
        name='runningTextEditModal'
        onFinish={handleSubmit}
        layout='horizontal'
        autoComplete='off'
        initialValues={dataMapped}
      >
        <Form.Item
          name='company_id'
          label='Company'
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

        <Form.Item
          name="status"
          label="Status"
        >
          <Select
            options={[
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' }
            ]}
            filterOption={onFilterOption}
            showSearch
            allowClear
          />
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
    )
  }

  return (
    <Modal
      title={<Title label="Edit Running text" />}
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