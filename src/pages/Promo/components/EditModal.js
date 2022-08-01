import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Form, Input, Row, Col, Button, Upload, message, Select, DatePicker, Space } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import moment from 'moment'

import { EditorState, ContentState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { stateFromHTML } from 'draft-js-import-html'

import { Title } from '../../../containers'
import { TextEditor } from '../../../components'
import { toBase64, validFileTypes } from '../../../utils/file'
import { requestCreatePromo, requestListBranch } from '../../../redux/master/action'

const EditModal = ({ visible, onClose, data }) => {
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

  const fetchBranch = useCallback(query => dispatch(requestListBranch(query)), [dispatch])

  useEffect(() => {
    const query = {
      "branch_id": Auth.user.branch_id,
      "branch_name": "",
      "region_id": "",
      "status": "active",
      "created_by": "",
      "created_date": "",
      "user_token": Auth.token
    }

    visible && fetchBranch(query)
  }, [visible, Auth.token, Auth.user.branch_id, fetchBranch])

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
        region_id: Auth.user.region_id,
        company_id: Auth.user.company_id,
      }
    }

    if (state.media.fileList.length) {
      payload.data.file = state.media.base64.split(',')[1]
      payload.data.file_name = state.media.fileList[0].name
    } else {
      payload.data.file = data.file
    }

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
      const isValid = validFileTypes.includes(file.type)

      if (!isValid) {
        message.error(`${file.name} is not a image file`);
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

  const EditForm = ({ data }) => {
    const copyData = { ...data }
    copyData.start_date = moment(data.promo.start_date);
    copyData.end_date = moment(data.promo.end_date);

    return (
      <Form
        {...formItemLayout}
        form={form}
        name='promoCreateModal'
        onFinish={handleSubmit}
        layout='horizontal'
        autoComplete='off'
        initialValues={copyData}
      >
        <Form.Item
          name="branch_id"
          label="Branch"
        >
          <Select
            options={Master.branch.options}
            filterOption={(input, option) =>
              option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            showSearch
            allowClear
          />
        </Form.Item>

        <Form.Item>
          <Row align='middle'>
            <Col span={6}>
              <p style={{ textAlign: 'right', paddingRight: 8, marginBottom: 0 }}>Upload File:</p>
            </Col>
            <Col span={12}>
              <Space direction='vertical'>
                <Upload {...uploadProps}>
                  <Button icon={<UploadOutlined style={{ marginRight: 6 }} />}>
                    Click to Upload
                  </Button>
                </Upload>

                {state.media.fileList.length > 0 && (
                  <div>
                    {state.media.type.indexOf('image') > -1 && (
                      <img
                        alt="profile"
                        src={state.media.base64}
                        className="h-32 transition-opacity ease-in-out duration-200 object-cover"
                      />
                    )}

                    {state.media.type.indexOf('video') > -1 && (
                      <video
                        controls
                        alt='file'
                        src={state.media.base64}
                        className='h-32 transition-opacity ease-in-out duration-200 object-cover'
                      />
                    )}
                  </div>
                )}
              </Space>
            </Col>
          </Row>
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
                    initialContent={copyData.popup_description}
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