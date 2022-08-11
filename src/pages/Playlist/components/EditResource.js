import React, { useCallback, useState } from 'react'
import { Form, Modal } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import { Title } from '../../../containers'

const EditResource = ({ visible, onClose, data }) => {
  const dispatch = useDispatch()
  const Auth = useSelector(state => state.Auth)
  const Master = useSelector(state => state.Master)
  const [form] = Form.useForm()

  const [state, setState] = useState({
    resources: []
  })

  const closeModal = useCallback(() => {
    setState({ ...state, resources: [] })
    form.resetFields()
    onClose()
  }, [onClose, form, setState, state])

  return (
    <Modal
      title={<Title label="Resource" />}
      visible={visible}
      onCancel={closeModal}
      width={600}
    >
      <p>Edit resource</p>
    </Modal>
  )
}

export default EditResource