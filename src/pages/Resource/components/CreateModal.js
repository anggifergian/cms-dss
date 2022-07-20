import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Form, Input, Row, Col, Button, Select, Radio, Upload, message, InputNumber } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

import { Title } from '../../../containers'
import { requestCreateResource } from '../../../redux/master/action'

const CreateModal = ({ visible, onClose }) => {
  const dispatch = useDispatch()
  const Auth = useSelector(state => state.Auth)
  const Master = useSelector(state => state.Master)
  const [form] = Form.useForm()

  const [fileList, setFileList] = useState([])

  const closeModal = useCallback(() => {
    form.resetFields()
    onClose()
  }, [onClose, form])

  useEffect(() => {
    Master.reload && closeModal()
  }, [Master.reload, closeModal])

  const fetchCreate = query => dispatch(requestCreateResource(query))

  const handleSubmit = (values) => {
    const payload = {
      endpoint: '/resource/addNewResource',
      data: {
        ...values,
        thumbnail: fileList[0] ? fileList[0].name : '',
        file: fileList[0] ? fileList[0].name : '',
        type: fileList[0] ? fileList[0].type : '',
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
    fileList: fileList,
    maxCount: 1,
    beforeUpload: (file) => {
      const isImage = file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg"

      if (!isImage) {
        message.error(`${file.name} is not a image file`);
      } else {
        setFileList([file]);
      }

      return false
    },
    onRemove: (file) => {
      setFileList([])
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
        initialValues={{ order: 1 }}
      >
        <Form.Item>
          <Row align='middle'>
            <Col span={4}>
              <p style={{ textAlign: 'right', paddingRight: 8, marginBottom: 0 }}>File:</p>
            </Col>
            <Col span={12}>
              <Upload {...uploadProps}>
                <Button icon={<UploadOutlined style={{ marginRight: 6 }} />}>
                  Click to Upload
                </Button>
              </Upload>
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
          label='How much?'
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