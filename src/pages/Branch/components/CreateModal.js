import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Form, Input, Row, Col, Button, Select } from 'antd'

import { Title } from '../../../containers'
import { requestCreateBranch, requestListRegion } from '../../../redux/master/action'

const CreateModal = ({ visible, onClose }) => {
  const dispatch = useDispatch()
  const Auth = useSelector(state => state.Auth)
  const Master = useSelector(state => state.Master)
  const [form] = Form.useForm()

  const closeModal = useCallback(() => {
    form.resetFields()
    onClose()
  }, [onClose, form])

  useEffect(() => {
    Master.reload && closeModal()
  }, [Master.reload, closeModal])

  const fetchCreate = query => dispatch(requestCreateBranch(query))
  const fetchRegion = query => dispatch(requestListRegion(query))

  const initOption = () => {
    const query = {
      "region_name": "",
      "company_id": "",
      "status": "active",
      "created_by": "",
      "created_date": "",
      "user_token": Auth.token
    }

    fetchRegion(query)
  }

  const handleSubmit = (values) => {
    const payload = {
      endpoint: '/branch/addNewBranch',
      data: {
        ...values,
        user_token: Auth.token,
      }
    }

    fetchCreate(payload)
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

  return (
    <Modal
      title={<Title label="Form Branch" />}
      visible={visible}
      onCancel={closeModal}
      width={600}
      footer={null}
    >
      <Form
        {...formItemLayout}
        form={form}
        name='branchCreateModal'
        onFinish={handleSubmit}
        layout='horizontal'
        autoComplete='off'
      >
        <Form.Item
          name="branch_name"
          label="Branch"
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="region_id"
          label="Region"
        >
          <Select
            onFocus={() => !Master.region.options && initOption()}
            options={Master.region.options}
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