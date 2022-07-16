import { Button, Row } from 'antd'
import React, { useState } from 'react'

import { Title, BaseLayout } from '../../containers'
import SectionModal from './SectionModal'
import SectionTable from './SectionTable'

const Region = () => {
  const [state, setState] = useState({
    visible: false,
    typeModal: ''
  })

  const handleShowModal = (typeModal = '') => {
    setState({
      ...state,
      visible: !state.visible,
      typeModal,
    })
  }

  return (
    <BaseLayout>
      <Row
        align="bottom"
        justify="space-between"
        style={{ marginBottom: 20 }}
      >
        <Title label="Region" />

        <Button
          type='primary'
          onClick={() => handleShowModal('create')}
        >
          Add region
        </Button>
      </Row>

      <div className='w-full rounded bg-white p-6'>
        <SectionModal
          modalType={state.typeModal}
          visible={state.visible}
          handleCloseModal={() => setState({ ...state, visible: false })}
        />
        <SectionTable />
      </div>
    </BaseLayout>
  )
}

export default Region