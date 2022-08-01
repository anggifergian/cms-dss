import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Form, Row, Col, Button, Select, Radio, InputNumber, Input, Upload, message, Space } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

import { Title } from '../../../containers'
import { requestCreateResource } from '../../../redux/master/action'
import { toBase64, validFileTypes } from '../../../utils/file'

const EditModal = ({ visible, onClose, data }) => {
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
      endpoint: '/resource/updateResource',
      data: {
        ...copyValues,
        status: data['status'],
        resource_id: data['resource_id'],
        thumbnail: media.fileList[0] ? media.fileList[0].name : '',
        type: media.fileList[0] ? media.fileList[0].type : '',
        user_token: Auth.token,
      }
    }

    if (media.fileList.length) {
      payload.data.file = media.base64.split(',')[1]
      payload.data.file_name = media.fileList[0] ? media.fileList[0].name : ''
    } else {
      payload.data.file = data.file
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
      const isValid = validFileTypes.includes(file.type)

      if (!isValid) {
        message.error(`${file.name} is not a image file`);
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

  const EditForm = ({ data }) => {
    return (
      <Form
        {...formItemLayout}
        form={form}
        name='branchCreateModal'
        onFinish={handleSubmit}
        layout='horizontal'
        autoComplete='off'
        initialValues={data}
      >
        <Form.Item>
          <Row align='middle'>
            <Col span={4}>
              <p style={{ textAlign: 'right', paddingRight: 8, marginBottom: 0 }}>File:</p>
            </Col>
            <Col span={20}>
              <Space direction='vertical'>
                <Upload {...uploadProps}>
                  <Button icon={<UploadOutlined style={{ marginRight: 6 }} />}>
                    Click to Upload
                  </Button>
                </Upload>

                {media.fileList.length > 0 && (
                  <div>
                    {media.type.indexOf('image') > -1 && (
                      <img
                        alt="file"
                        src={media.base64}
                        className="h-32 transition-opacity ease-in-out duration-200 object-cover"
                      />
                    )}

                    {media.type.indexOf('video') > -1 && (
                      <video
                        controls
                        alt="file"
                        src={media.base64}
                        className="h-32 transition-opacity ease-in-out duration-200 object-cover"
                      />
                    )}
                  </div>
                )}
              </Space>
            </Col>
          </Row>
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

        <Form.Item
          name='order'
          label='Order?'
        >
          <InputNumber min={1} max={5} />
        </Form.Item>

        <Form.Item noStyle>
          <Row align="middle" justify="end">
            <Col>
              <Button
                id="btn-create-submit"
                type="primary"
                htmlType="submit"
              >
                Update
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    )
  }

  return (
    <Modal
      title={<Title label="Edit Resource" />}
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