import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Form, Input, Row, Col, Button, Upload, message, Select, DatePicker } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import moment from 'moment'

import { Title } from '../../../containers'
import { requestCreatePromo, requestListBranch } from '../../../redux/master/action'

const EditModal = ({ visible, onClose, data }) => {
  const dispatch = useDispatch()
  const Auth = useSelector(state => state.Auth)
  const Master = useSelector(state => state.Master)
  const [form] = Form.useForm()

  const [fileList, setFileList] = useState([])

  useEffect(() => {
    form.resetFields()
  }, [visible, form])

  const closeModal = useCallback(() => {
    onClose()
  }, [onClose])

  useEffect(() => {
    console.log({
      start_date: moment(data.promo.start_date),
      end_date: moment(data.promo.end_date)
    })
  }, [])

  useEffect(() => {
    Master.reload && closeModal()
  }, [Master.reload, closeModal])

  const fetchCreate = query => dispatch(requestCreatePromo(query))

  const fetchBranch = useCallback(query => dispatch(requestListBranch(query)), [dispatch])

  useEffect(() => {
    const query = {
      "branch_name": "",
      "region_id": "",
      "status": "active",
      "created_by": "",
      "created_date": "",
      "user_token": Auth.token
    }

    visible && fetchBranch(query)
  }, [visible, Auth.token, fetchBranch])

  const handleSubmit = (values) => {
    console.log(values)
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

  const EditForm = ({ data }) => {
    return (
      <Form
        {...formItemLayout}
        form={form}
        name='promoCreateModal'
        onFinish={handleSubmit}
        layout='horizontal'
        autoComplete='off'
        initialValues={data}
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

        {/* <Form.Item
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
        </Form.Item> */}

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