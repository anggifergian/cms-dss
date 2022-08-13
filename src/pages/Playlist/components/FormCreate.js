import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Button, Col, DatePicker, Form, Row, Select, Input } from 'antd'

import { BaseLayout, Title } from '../../../containers'
import { requestCreatePlaylist } from '../../../redux/playlist/action'
import { requestListBranch, requestListCompany, requestListPosition, requestListRegion } from '../../../redux/master/action'
import AddResource from './AddResource'

const FormCreate = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const Auth = useSelector(state => state.Auth)
  const Master = useSelector(state => state.Master)
  const Playlist = useSelector(state => state.Playlist)

  const [form] = Form.useForm()

  const [state, setState] = useState({
    isModalVisible: false,
    resource_list: [],
    form: {
      company_id: '',
      region_id: '',
    }
  })

  useEffect(() => {
    Playlist.reload && backToPlaylist()
  }, [Playlist.reload])

  const fetchCreate = query => dispatch(requestCreatePlaylist(query))
  const fetchBranch = query => dispatch(requestListBranch(query))
  const fetchPosition = query => dispatch(requestListPosition(query))
  const fetchCompany = query => dispatch(requestListCompany(query))
  const fetchRegion = query => dispatch(requestListRegion(query))

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

  const initOptionPosition = () => {
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

    fetchPosition(query)
  }

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
      "region_id": Auth.user.branch_id,
      "region_name": "",
      "company_id": company_id,
      "status": "active",
      "created_by": "",
      "created_date": "",
      "user_token": Auth.token
    }

    fetchRegion(query)
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
      endpoint: '/playlist/addNewPlaylist',
      data: {
        ...values,
        start_date: values.start_date.format('YYYY-MM-DD'),
        end_date: values.end_date.format('YYYY-MM-DD'),
        user_token: Auth.token,
        resource_list: []
      }
    }

    if (state.resource_list.length) {
      const resourceMap = state.resource_list.map((item, index) => ({
        resource_id: item.value,
        order: index + 1
      }))

      payload.data.resource_list = resourceMap
    }

    payload.data = checkAllOption(payload.data, ['region_id', 'branch_id'])

    fetchCreate(payload)
  }

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
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

  const handleCloseModal = (data) => {
    setState({
      ...state,
      isModalVisible: false,
      resource_list: data || []
    })
  }

  const handleOpenModal = () => {
    setState({
      ...state,
      isModalVisible: true
    })
  }

  const backToPlaylist = () => {
    history.push('/playlist')
  }

  return (
    <BaseLayout>
      <div>
        <p
          onClick={backToPlaylist}
          className='underline inline-block text-gray-500 hover:cursor-pointer hover:text-gray-700'
        >
          Back to Playlist
        </p>
      </div>

      <div className='w-full bg-white p-4 rounded-md shadow-sm'>
        <div className='px-4 pb-6 pt-2'>
          <Title label='Form Playlist' />
        </div>

        <Form
          {...formItemLayout}
          form={form}
          name='playlistCreateModal'
          onFinish={handleSubmit}
          layout='horizontal'
          autoComplete='off'
        >
          <Form.Item
            name='company_id'
            label='Company'
          >
            <Select
              onFocus={() => !Master.company.options && initOptionCompany()}
              onChange={(value) => resetForm(value, 'company')}
              options={Master.company.options}
              filterOption={onFilterOption}
              showSearch
              allowClear
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
                  disabled={!getFieldValue('company_id')}
                  onChange={(value) => resetForm(value, 'region')}
                  onFocus={() => initOptionRegion(getFieldValue('company_id'))}
                  options={Master.region.options}
                  filterOption={onFilterOption}
                  showSearch
                  allowClear
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
                name='branch_id'
                label='Branch'
              >
                <Select
                  disabled={!getFieldValue('region_id')}
                  onFocus={() => initOptionBranch(getFieldValue('region_id'))}
                  options={Master.branch.options}
                  filterOption={onFilterOption}
                  showSearch
                  allowClear
                />
              </Form.Item>
            )}
          </Form.Item>

          <Form.Item
            name='position_id'
            label='Position'
          >
            <Select
              onFocus={() => !Master.position.options && initOptionPosition()}
              options={Master.position.options}
              filterOption={onFilterOption}
              showSearch
              allowClear
            />
          </Form.Item>

          <Form.Item>
            <Row align='middle'>
              <Col span={4}>
                <p
                  style={{
                    textAlign: 'right',
                    paddingRight: 8,
                    marginBottom: 0
                  }}
                >
                  Resource:
                </p>
              </Col>
              <Col span={18}>
                <Button
                  type={state.resource_list.length ? 'primary' : 'default'}
                  onClick={handleOpenModal}
                  style={{ width: 100 }}
                >
                  {state.resource_list.length ? 'Change' : 'Add'}
                </Button>

                {state.resource_list.length ? (
                  <div className='pt-4 grid grid-cols-1 gap-2'>
                    {state.resource_list.map((item, index) => (
                      <div key={index} className='py-1 pl-3 px-2 rounded border border-opacity-40'>
                        <span className='pr-2'>{index + 1}</span>
                        <span>{item.label}</span>
                      </div>
                    ))}
                  </div>
                ) : null}
              </Col>
            </Row>
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
      </div>

      <AddResource
        visible={state.isModalVisible}
        onClose={handleCloseModal}
        data={state.resource_list}
      />
    </BaseLayout>
  )
}

export default FormCreate