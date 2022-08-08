import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Form, Input, Row, Col, Button, Upload, message, Select, DatePicker, Space, Radio } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

import { Title } from '../../../containers'
import { TextEditor } from '../../../components'
import { toBase64, validImageTypes, validVideoTypes } from '../../../utils/file'
import { requestCreatePromo, requestListBranch, requestListCompany, requestListRegion } from '../../../redux/master/action'

const CreateModal = ({ visible, onClose }) => {
  const dispatch = useDispatch()
  const Auth = useSelector(state => state.Auth)
  const Master = useSelector(state => state.Master)
  const [form] = Form.useForm()

  const [state, setState] = useState({
    form: {
      isPopup: ''
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
      ...state,
      media: {
        fileList: [],
        base64: '',
        type: '',
      }
    })
  }, [setState, state])

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
  const fetchCompany = query => dispatch(requestListCompany(query))
  const fetchRegion = query => dispatch(requestListRegion(query))
  const fetchBranch = query => dispatch(requestListBranch(query))

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
      endpoint: '/promo/addNewPromo',
      data: {
        ...values,
        popup_description: values.popup === 'yes' ? state.richText.htmlValue : '',
        start_date: values.start_date.format('YYYY-MM-DD'),
        end_date: values.end_date.format('YYYY-MM-DD'),
        file: state.media.fileList[0] ? state.media.base64.split(',')[1] : '',
        file_name: state.media.fileList[0] ? state.media.fileList[0].name : '',
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

  const onFilterOption = (input, option) => {
    return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
  }

  return (
    <Modal
      title={<Title label="Form Promo" />}
      visible={visible}
      onCancel={closeModal}
      width={600}
      footer={null}
    >
      <Form
        {...formItemLayout}
        form={form}
        name='promoCreateModal'
        onFinish={handleSubmit}
        layout='horizontal'
        autoComplete='off'
        initialValues={{
          popup: 'no',
          resource_type: 'image'
        }}
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
                    editorState={state.richText.editorState}
                    onEditorStateChange={onEditorStateChange}
                  />
                </div>
              </Col>
            </Row>
          ) : null}
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