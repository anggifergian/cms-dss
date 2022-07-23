import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Form, Input, Row, Col, Button, Upload, message, Select, DatePicker, Space } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

import { Title } from '../../../containers'
import { requestCreatePromo, requestListBranch } from '../../../redux/master/action'
import { toBase64 } from '../../../utils/file'

const CreateModal = ({ visible, onClose }) => {
  const dispatch = useDispatch()
  const Auth = useSelector(state => state.Auth)
  const Master = useSelector(state => state.Master)
  const [form] = Form.useForm()

  const [media, setMedia] = useState({
    fileList: [],
    base64: ''
  })

  const resetState = useCallback(() => {
    setMedia({
      fileList: [],
      base64: ''
    })
  }, [setMedia])

  useEffect(() => {
    form.resetFields()
    resetState()
  }, [visible, form, resetState])

  const closeModal = useCallback(() => {
    onClose()
  }, [onClose])

  useEffect(() => {
    Master.reload && closeModal()
  }, [Master.reload, closeModal])

  const fetchCreate = query => dispatch(requestCreatePromo(query))
  const fetchBranch = query => dispatch(requestListBranch(query))

  const initOption = () => {
    const query = {
      "branch_id": Auth.user.branch_id,
      "branch_name": "",
      "region_id": "",
      "status": "active",
      "created_by": "",
      "created_date": "",
      "user_token": Auth.token
    }

    fetchBranch(query)
  }

  const handleSubmit = (values) => {
    const payload = {
      ...values,
      start_date: values.start_date.format('YYYY-MM-DD'),
      end_date: values.end_date.format('YYYY-MM-DD'),
      file: media.base64.split(',')[1],
      file_name: media.fileList[0] ? media.fileList[0].name : '',
      user_token: Auth.token,
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
    fileList: media.fileList,
    maxCount: 1,
    beforeUpload: async (file) => {
      const isImage = file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg"

      if (!isImage) {
        message.error(`${file.name} is not a image file`);
      } else {
        const base64 = await toBase64(file)
        setMedia({
          base64,
          fileList: [file]
        })
      }

      return false
    },
    onRemove: (file) => {
      resetState()
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
        <Form.Item
          name="branch_id"
          label="Branch"
        >
          <Select
            onFocus={() => !Master.branch.options && initOption()}
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

                {media.fileList.length > 0 && (
                  <div className='pl-4'>
                    <img
                      alt="profile"
                      src={media.base64}
                      className="h-24 transition-opacity ease-in-out duration-200 object-cover"
                    />
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
          <DatePicker format='YYYY-MM-DD' />
        </Form.Item>

        <Form.Item
          name="end_date"
          label="End Date"
          {...dateConfig}
        >
          <DatePicker format='YYYY-MM-DD' />
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
          <Input />
        </Form.Item>

        <Form.Item
          name="popup_description"
          label="Popup Description"
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