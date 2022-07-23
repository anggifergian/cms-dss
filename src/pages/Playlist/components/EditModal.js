import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Modal } from 'antd'

import { Title } from '../../../containers'

const EditModal = ({ visible, onClose }) => {
  const dispatch = useDispatch()
  const Auth = useSelector(state => state.Auth)
  const Playlist = useSelector(state => state.Playlist)
  const [form] = Form.useForm()

  useEffect(() => {
    form.resetFields()
  }, [form, visible])

  const closeModal = useCallback(() => {
    onClose()
  }, [onClose])

  useEffect(() => {
    Playlist.reload && onClose()
  }, [Playlist.reload, onClose])

  return (
    <Modal
      title={<Title label="Edit Playlist" />}
      visible={visible}
      onCancel={closeModal}
      width={600}
      footer={null}
    >
      <span>Modal Edit Playlist</span>
    </Modal>
  )
}

export default EditModal