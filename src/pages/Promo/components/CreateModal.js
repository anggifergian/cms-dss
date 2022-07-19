import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Form, Input, Row, Col, Button, Upload, message } from 'antd'

import { Title } from '../../../containers'
import { requestCreatePromo } from '../../../redux/master/action'
import { UploadOutlined } from '@ant-design/icons'

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
    if (Master.reload) {
      console.log('close...')
    }
  }, [Master.reload])

  const fetchCreate = query => dispatch(requestCreatePromo(query))

  const handleSubmit = (values) => {
    console.log('values', values)
    console.log('file', fileList[0])
    // const payload = {
    //   ...values,
    //   user_token: Auth.token,
    // }

    // fetchCreate(payload)
    closeModal()
  }

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18 },
    }
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
      >
        <Form.Item>
          <Row align='middle'>
            <Col span={8}>
              <p style={{ textAlign: 'right', paddingRight: 8, marginBottom: 0 }}>Upload File:</p>
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
          name="tittle"
          label="Promo name"
          rules={[
            { required: true, message: 'Required' }
          ]}
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