import React, { useCallback } from 'react'
import { Modal } from 'antd'

const PreviewModal = ({ visible, onClose, data }) => {
  const closeModal = useCallback(() => {
    onClose()
  }, [onClose])

  return (
    <Modal
      visible={visible}
      onCancel={closeModal}
      width={600}
      footer={null}
    >
      Image here
    </Modal>
  )
}

export default PreviewModal