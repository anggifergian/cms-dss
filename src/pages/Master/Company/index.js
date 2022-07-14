import React, { useEffect, useState } from 'react'
import { Button, Layout, Row } from 'antd'
import axios from 'axios'

import { Title, BaseLayout } from '../../../containers'
import SectionModal from './SectionModal'
import SectionTable from './SectionTable'
import { dev_api } from '../../../settings/config'
import { getCompanies } from '../../../api/company'

const { Content } = Layout

const Company = () => {
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
        <Title label="Company" />

        <Button
          type='primary'
          onClick={() => handleShowModal('create')}
        >
          Add company
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

export default Company