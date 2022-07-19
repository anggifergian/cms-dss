import React, { useState } from 'react'
import { Button, Row, Space, Layout } from 'antd'

import { Title, BaseLayout } from '../../containers'
import SectionModal from './SectionModal'
import SectionTable from './SectionTable'

const { Content } = Layout

const Company = () => {
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
        <Title label="Company" />

        <Space>
          <Button
            onClick={() => {
              const data = {
                company_id: 1,
                company_name: '1',
                company_address: '1',
                company_phone: '1',
                company_email: '1'
              }

              handleShowModal('edit', data)
            }}
          >
            Edit company
          </Button>
          <Button
            type='primary'
            onClick={() => handleShowModal('create')}
          >
            Add company
          </Button>
        </Space>
      </Row>

      <div className='w-full rounded bg-white p-6'>
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

export default Company