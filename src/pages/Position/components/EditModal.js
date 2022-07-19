import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Form, Input, Row, Col, Button, Select } from 'antd'

import { Title } from '../../../containers'

const EditModal = ({ visible, onClose, data }) => {
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

  return (
    <Modal
      title={<Title label="Edit Position" />}
      visible={visible}
      onCancel={closeModal}
      width={600}
      footer={null}
    >
      <div>EditModal</div>
    </Modal>
  )
}

export default EditModal