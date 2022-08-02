import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Form, Input, Row, Col, Button, Select, Radio, Upload, message, InputNumber, Space } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

import { Title } from '../../../containers'
import { requestCreateResource } from '../../../redux/master/action'
import { toBase64, validImageTypes, validVideoTypes } from '../../../utils/file'

const CreateModal = ({ visible, onClose }) => {
  const dispatch = useDispatch()
  const Auth = useSelector(state => state.Auth)
  const Master = useSelector(state => state.Master)
  const [form] = Form.useForm()

  const [media, setMedia] = useState({
    fileList: [],
    base64: '',
    type: ''
  })

  const resetState = useCallback(() => {
    setMedia({
      fileList: [],
      base64: '',
      type: ''
    })
  }, [setMedia])

  useEffect(() => {
    form.resetFields()
    resetState()
  }, [form, visible, resetState])

  const closeModal = useCallback(() => {
    onClose()
  }, [onClose])

  useEffect(() => {
    Master.reload && closeModal()
  }, [Master.reload, closeModal])

  const fetchCreate = query => dispatch(requestCreateResource(query))

  const handleSubmit = (values) => {
    const copyValues = { ...values }
    delete copyValues.type

    const payload = {
      endpoint: '/resource/addNewResource',
      data: {
        ...copyValues,
        thumbnail: media.fileList[0] ? media.fileList[0].name : '',
        file: media.fileList[0] ? media.base64.split(',')[1] : '',
        file_name: media.fileList[0] ? media.fileList[0].name : '',
        type: media.fileList[0] ? media.fileList[0].type : '',
        user_token: Auth.token,
      }
    }

    fetchCreate(payload)
  }

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
  }

  const uploadProps = {
    fileList: media.fileList,
    maxCount: 1,
    beforeUpload: async (file) => {
      const mediaType = form.getFieldValue('resource_type')
      const isValid = mediaType === 'image'
        ? validImageTypes.includes(file.type)
        : validVideoTypes.includes(file.type)

      if (!isValid) {
        message.error(`${file.name} is not a ${mediaType === 'image' ? 'Image' : 'Video'} file`);
      } else {
        const base64 = await toBase64(file)
        setMedia({
          base64,
          fileList: [file],
          type: file.type,
        })
      }

      return false
    },
    onRemove: (file) => {
      resetState()
    }
  }

  const handleRadioChange = file => {
    if (media.fileList.length) {
      const value = file.target.value
      const typeIndex = media.type.indexOf(value)

      typeIndex < 0 && resetState()
    }
  }

  return (
    <Modal
      title={<Title label="Form Resource" />}
      visible={visible}
      onCancel={closeModal}
      width={600}
      footer={null}
    >
      <Form
        {...formItemLayout}
        form={form}
        name='resourceCreateModal'
        onFinish={handleSubmit}
        layout='horizontal'
        autoComplete='off'
        initialValues={{
          order: 1,
          resource_type: 'image'
        }}
      >
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
                      <Col span={4}>
                        <p style={{ textAlign: 'right', paddingRight: 8, marginBottom: 0 }}>Image:</p>
                      </Col>
                      <Col span={20}>
                        <Space direction='vertical'>
                          <Upload {...uploadProps}>
                            <Button icon={<UploadOutlined style={{ marginRight: 6 }} />}>
                              Click to Upload
                            </Button>
                          </Upload>

                          {(media.fileList.length > 0 && media.type.indexOf('image') > -1) && (
                            <div>
                              <img
                                alt="file"
                                src={media.base64}
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
                      <Col span={4}>
                        <p style={{ textAlign: 'right', paddingRight: 8, marginBottom: 0 }}>Video:</p>
                      </Col>
                      <Col span={20}>
                        <Space direction='vertical'>
                          <Upload {...uploadProps}>
                            <Button icon={<UploadOutlined style={{ marginRight: 6 }} />}>
                              Click to Upload
                            </Button>
                          </Upload>

                          {(media.fileList.length > 0 && media.type.indexOf('video') > -1) && (
                            <div>
                              <video
                                controls
                                alt="file"
                                src={media.base64}
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
          name="resource_name"
          label="Title"
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="stretch"
          label="Type"
        >
          <Radio.Group>
            <Radio value="stretch"> Strech </Radio>
            <Radio value="nope"> Fixed </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="duration"
          label="Duration"
        >
          <Select
            options={[
              { label: '30s', value: 30 },
              { label: '40s', value: 40 },
              { label: '50s', value: 50 },
            ]}
            filterOption={(input, option) =>
              option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
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