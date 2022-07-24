import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from 'antd'
import { requestFileImage } from '../../../redux/master/action'
import { Title } from '../../../containers'

const PreviewModal = ({ visible, onClose, data }) => {
  const dispatch = useDispatch()
  const Master = useSelector(state => state.Master)

  const fetchImage = useCallback(query => dispatch(requestFileImage(query)), [dispatch])

  useEffect(() => {
    const payload = {
      endpoint: '',
      data: {
        file_name: data['file_name'],
        folder: 'promo'
      }
    }

    fetchImage(payload)
  }, [fetchImage, data])

  const closeModal = useCallback(() => {
    onClose()
  }, [onClose])

  return (
    <Modal
      title={<Title label='Preview Image' />}
      visible={visible}
      onCancel={closeModal}
      width={600}
      footer={null}
    >
      {!Master.file.isLoading && (
        <p>Image here</p>
      )}
    </Modal>
  )
}

export default PreviewModal