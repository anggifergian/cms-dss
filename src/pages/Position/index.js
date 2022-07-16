import React, { useState } from 'react'
import { Button, Row, Layout } from 'antd'

import { Title, BaseLayout } from '../../containers'
import SectionModal from './SectionModal'
import SectionTable from './SectionTable'

const { Content } = Layout

const Position = () => {
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
        <Title label="Position" />

        <Button
          type='primary'
          onClick={() => handleShowModal('create')}
        >
          Add Position
        </Button>
      </Row>

      <div className='w-full rounded bg-white p-6'>
        <Content>
          <SectionModal
            modalType={state.typeModal}
            visible={state.visible}
            handleCloseModal={() => setState({ ...state, visible: false })}
          />
          <SectionTable />
        </Content>
      </div>
    </BaseLayout>
  )
}

export default Position