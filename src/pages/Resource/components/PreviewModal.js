import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Spin } from 'antd'

import { requestFileImage } from '../../../redux/master/action'
import { Title } from '../../../containers'

const PreviewModal = ({ visible, onClose, data }) => {
  const dispatch = useDispatch()
  const Master = useSelector(state => state.Master)

  const [state, setState] = useState({
    isImage: false
  })

  const fetchImage = useCallback(query => dispatch(requestFileImage(query)), [dispatch])

  useEffect(() => {
    const payload = {
      endpoint: '/utility/getFile',
      data: {
        file_name: data['file_name'],
        folder: 'resource'
      }
    }

    fetchImage(payload)
  }, [fetchImage, data])

  useEffect(() => {
    if (data) {
      const splited = data.file_name.split('.')
      const validImages = ['jpeg', 'jpg', 'png']
      const isImage = validImages.includes(splited[1])
      setState({ ...state, isImage })
    }
  }, [data, state, setState])

  const closeModal = useCallback(() => {
    onClose()
  }, [onClose])

  return (
    <Modal
      title={<Title label='Preview' />}
      visible={visible}
      onCancel={closeModal}
      width={600}
      footer={null}
    >
      {Master.file.isLoading ? (
        <div className='flex justify-center'>
          <Spin />
        </div>
      ) : (state.isImage ? (
        <img
          alt='promo'
          className='w-full object-cover h-96 rounded'
          src={`data:image/jpeg;base64,${Master.file.data}`}
        />
      ) : (
        <video
          controls
          alt='resource'
          className='w-full object-cover h-96 rounded'
          src={`data:video/mp4;base64,${Master.file.data}`}
        />
      ))}
    </Modal>
  )
}

export default PreviewModal