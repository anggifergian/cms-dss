import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Form, Input, Row, Col, Button, Upload, message, Select, DatePicker, Space, Radio } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import moment from 'moment'

import { EditorState, ContentState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { stateFromHTML } from 'draft-js-import-html'

import { Title } from '../../../containers'
import { TextEditor } from '../../../components'
import { onFilterOption } from '../../../utils/antdUtil'
import { toBase64, validImageTypes, validVideoTypes } from '../../../utils/file'
import { requestCreatePromo, requestListBranch, requestListCompany, requestListRegion } from '../../../redux/master/action'

const EditModal = ({ visible, onClose, data }) => {
  const dispatch = useDispatch()
  const Auth = useSelector(state => state.Auth)
  const Master = useSelector(state => state.Master)
  const [form] = Form.useForm()

  const [state, setState] = useState({
    form: {
      isPopup: '',
      company_id: '',
      region_id: '',
    },
    media: {
      fileList: [],
      base64: '',
      type: '',
    },
    richText: {
      editorState: EditorState.createEmpty(),
      htmlValue: ''
    }
  })

  useState(() => {
    if (!data.popup_description) {
      return
    }

    const popup = stateFromHTML(data.popup_description)
    const editorState = EditorState.createWithContent(popup)

    setState({
      ...state,
      richText: {
        ...state.richText,
        editorState
      }
    })
  }, [ContentState, EditorState, setState, state, data.popup_description])

  const onEditorStateChange = (editorState) => {
    const htmlValue = draftToHtml(convertToRaw(editorState.getCurrentContent()))

    setState({
      ...state,
      richText: {
        editorState,
        htmlValue,
      }
    })
  }

  const resetState = useCallback(() => {
    setState({
      form: {
        isPopup: '',
        company_id: '',
        region_id: '',
      },
      media: {
        fileList: [],
        base64: '',
        type: '',
      },
      richText: {
        editorState: EditorState.createEmpty(),
        htmlValue: ''
      }
    })
  }, [setState])

  useEffect(() => {
    form.resetFields()
  }, [visible, form])

  const closeModal = useCallback(() => {
    onClose()
  }, [onClose])

  useEffect(() => {
    Master.reload && closeModal()
  }, [Master.reload, closeModal])

  const fetchCreate = query => dispatch(requestCreatePromo(query))

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
      endpoint: '/promo/updatePromo',
      data: {
        ...values,
        popup_description: values.popup === 'yes' ? state.richText.htmlValue : '',
        start_date: values.start_date.format('YYYY-MM-DD'),
        end_date: values.end_date.format('YYYY-MM-DD'),
        status: data['status'],
        promo_id: data['promo_id'],
        user_token: Auth.token,
      }
    }

    if (state.media.fileList.length) {
      payload.data.file = state.media.base64.split(',')[1]
      payload.data.file_name = state.media.fileList[0].name
    } else {
      payload.data.file = data.file
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

  const uploadProps = {
    fileList: state.media.fileList,
    maxCount: 1,
    beforeUpload: async (file) => {
      const mediaType = form.getFieldValue('resource_type')
      const isValid = mediaType === 'image'
        ? validImageTypes.includes(file.type)
        : validVideoTypes.includes(file.type)

      if (!isValid) {
        message.error(`${file.name} is not a ${mediaType === 'image' ? 'image' : 'video'} file`)
      } else {
        const base64 = await toBase64(file)
        setState({
          ...state,
          media: {
            base64,
            fileList: [file],
            type: file.type,
          }
        })
      }

      return false
    },
    onRemove: (file) => {
      resetState()
    }
  }

  const handleRadioChange = file => {
    if (state.media.fileList.length) {
      const value = file.target.value
      const typeIndex = state.media.type.indexOf(value)

      typeIndex < 0 && resetState()
    }
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
        name='promoCreateModal'
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

        <Form.Item name="resource_type" label="Type">
          <Radio.Group onChange={handleRadioChange}>
            <Radio value="image">Image</Radio>
            <Radio value="video">Video</Radio>
            <Radio value="url">Url</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          noStyle
          shouldUpdate
        >
          {({ getFieldValue }) => {
            const resource_type = getFieldValue('resource_type')

            switch (resource_type) {
              case "url":
                return (
                  <Form.Item name='url_resource' label='Url'>
                    <Input placeholder="Input Url" />
                  </Form.Item>
                )
              case "image":
                return (
                  <Form.Item>
                    <Row align='middle'>
                      <Col span={6}>
                        <p style={{ textAlign: 'right', paddingRight: 8, marginBottom: 0 }}>Image:</p>
                      </Col>
                      <Col span={12}>
                        <Space direction='vertical'>
                          <Upload {...uploadProps}>
                            <Button icon={<UploadOutlined style={{ marginRight: 6 }} />}>
                              Click to Upload
                            </Button>
                          </Upload>

                          {(state.media.fileList.length > 0 && state.media.type.indexOf('image') > -1) && (
                            <div>
                              <img
                                alt="file"
                                src={state.media.base64}
                                className="h-32 transition-opacity ease-in-out duration-200 object-cover"
                              />
                            </div>
                          )}
                        </Space>
                      </Col>
                    </Row>
                  </Form.Item>
                )
              case "video":
                return (
                  <Form.Item>
                    <Row align='middle'>
                      <Col span={6}>
                        <p style={{ textAlign: 'right', paddingRight: 8, marginBottom: 0 }}>Video:</p>
                      </Col>
                      <Col span={12}>
                        <Space direction='vertical'>
                          <Upload {...uploadProps}>
                            <Button icon={<UploadOutlined style={{ marginRight: 6 }} />}>
                              Click to Upload
                            </Button>
                          </Upload>

                          {(state.media.fileList.length > 0 && state.media.type.indexOf('video') > -1) && (
                            <div>
                              <video
                                controls
                                alt="file"
                                src={state.media.base64}
                                className="h-32 transition-opacity ease-in-out duration-200 object-cover"
                              />
                            </div>
                          )}
                        </Space>
                      </Col>
                    </Row>
                  </Form.Item>
                )
              default:
                return null
            }
          }}
        </Form.Item>

        <Form.Item
          name="tittle"
          label="Promo name"
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
          name="popup"
          label="Popup"
        >
          <Select
            options={[
              { label: 'Yes', value: 'yes' },
              { label: 'No', value: 'no' }
            ]}
            filterOption={(input, option) =>
              option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            showSearch
            allowClear
          />
        </Form.Item>

        <Form.Item
          noStyle
          shouldUpdate={(prev, curr) => prev.popup !== curr.popup}
        >
          {({ getFieldValue }) => getFieldValue('popup') === 'yes' ? (
            <Row>
              <Col style={{ marginBottom: 10 }}><span className='mb-4'>Popup description</span></Col>
              <Col sm={24}>
                <div>
                  <TextEditor
                    initialContent={dataMapped.popup_description}
                    editorState={state.richText.editorState}
                    onEditorStateChange={onEditorStateChange}
                  />
                </div>
              </Col>
            </Row>
          ) : null}
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
      title={<Title label="Edit Promo" />}
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