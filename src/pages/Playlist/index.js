import React, { useState } from 'react'
import { Button, Row, Layout } from 'antd'

import { Title, BaseLayout } from '../../containers'
import SectionModal from './SectionModal'
import SectionTable from './SectionTable'

const { Content } = Layout

const Playlist = () => {
  const [state, setState] = useState({
    visible: false,
    typeModal: '',
    data: {}
  })

  const handleShowModal = (typeModal = '', data = {}) => {
    setState({
      ...state,
      visible: !state.visible,
      typeModal,
      data,
    })
  }

  return (
    <BaseLayout>
      <Row
        align="bottom"
        justify="space-between"
        style={{ marginBottom: 20 }}
      >
        <Title label="Playlist" />

        <Button
          type='primary'
          onClick={() => handleShowModal('create')}
        >
          Add Playlist
        </Button>
      </Row>

      <div className='w-full bg-white p-4 rounded-md shadow-sm'>
        <Content>
          <SectionModal
            modalType={state.typeModal}
            visible={state.visible}
            data={state.data}
            handleCloseModal={() => setState({ ...state, visible: false })}
          />
          <SectionTable handleShowModal={handleShowModal} />
        </Content>
      </div>
    </BaseLayout>
  )
}

export default Playlist