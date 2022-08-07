import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Modal, Select, Input, Row, Col, Button, DatePicker } from 'antd'
import moment from 'moment'

import { Title } from '../../../containers'
import { requestCreatePlaylist } from '../../../redux/playlist/action'
import {
  requestListBranch,
  requestListCompany,
  requestListPosition,
  requestListRegion,
} from '../../../redux/master/action'

const EditModal = ({ visible, onClose, data }) => {
  const dispatch = useDispatch()
  const Auth = useSelector(state => state.Auth)
  const Master = useSelector(state => state.Master)
  const Playlist = useSelector(state => state.Playlist)
  const [form] = Form.useForm()

  useEffect(() => {
    form.resetFields()
  }, [form, visible])

  const closeModal = useCallback(() => {
    onClose()
  }, [onClose])

  useEffect(() => {
    Playlist.reload && onClose()
  }, [Playlist.reload, onClose])

  const fetchCreate = query => dispatch(requestCreatePlaylist(query))

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

  const initOptionPosition = useCallback(() => {
    const query = {
      "device_id": "",
      "box": "",
      "x_pos": "",
      "y_pos": "",
      "width": "",
      "height": "",
      "measurement": "",
      "status": "active",
      "created_by": "",
      "created_date": "",
      "updated_by": "",
      "updated_date": "",
      "user_token": Auth.token
    }

    dispatch(requestListPosition(query))
  }, [dispatch, Auth.token])

  useEffect(() => {
    initOptionCompany()
    initOptionPosition()
    initOptionBranch(data.region_id)
    initOptionRegion(data.company_id)
  }, [
    data.region_id,
    data.company_id,
    initOptionBranch,
    initOptionRegion,
    initOptionCompany,
    initOptionPosition,
  ])

  const handleSubmit = (values) => {
    const payload = {
      endpoint: '/playlist/updatePlaylist',
      data: {
        ...values,
        start_date: values.start_date.format('YYYY-MM-DD'),
        end_date: values.end_date.format('YYYY-MM-DD'),
        status: data['status'],
        playlist_id: data['playlist_id'],
        resource_list: data['resource_list'],
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
    }
  }

  const dateConfig = {
    rules: [
      {
        required: true,
        message: 'Please select time!',
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
    const copyData = { ...data }
    copyData.start_date = moment(data.start_date);
    copyData.end_date = moment(data.end_date);

    return (
      <Form
        {...formItemLayout}
        form={form}
        name='playlistEditModal'
        onFinish={handleSubmit}
        layout='horizontal'
        autoComplete='off'
        initialValues={copyData}
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
          name='position_id'
          label='Position'
        >
          <Select
            options={Master.position.options}
            filterOption={(input, option) =>
              option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            showSearch
            allowClear
          />
        </Form.Item>

        <Form.Item
          name="playlist_name"
          label="Playlist Name"
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
      title={<Title label="Edit Playlist" />}
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