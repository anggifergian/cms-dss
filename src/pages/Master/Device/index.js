import React from 'react'
import { Button, Row, Layout } from 'antd'

import { Title, BaseLayout } from '../../../containers'
import SectionModal from './SectionModal'
import SectionTable from './SectionTable'

const { Content } = Layout

const Device = () => {
  return (
    <BaseLayout>
      <Row
        align="bottom"
        justify="space-between"
        style={{ marginBottom: 20 }}
      >
        <Title label="Device" />

        <Button
          type='primary'
        >
          Add Device
        </Button>
      </Row>

      <div className='w-full rounded bg-white p-6'>
        <Content>
          <SectionTable />
        </Content>
      </div>
    </BaseLayout>
  )
}

export default Device