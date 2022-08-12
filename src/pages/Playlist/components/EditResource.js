import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, Modal, Select } from 'antd'
import { DownOutlined, UpOutlined } from '@ant-design/icons'

import { Title } from '../../../containers'
import { requestListResource } from '../../../redux/master/action'
import { array_move } from '../../../utils/array'

const EditResource = ({ visible, onClose, data }) => {
  const dispatch = useDispatch()
  const Auth = useSelector(state => state.Auth)
  const Master = useSelector(state => state.Master)
  const [form] = Form.useForm()

  const [state, setState] = useState({
    resources: []
  })

  const initOptionResource = useCallback(() => {
    const query = {
      "resource_name": "",
      "type": "",
      "thumbnail": "",
      "file": "",
      "duration": "",
      "stretch": "",
      "order": "",
      "status": "active",
      "created_by": "",
      "created_date": "",
      "updated_by": "",
      "updated_date": "",
      "user_token": Auth.token
    }

    dispatch(requestListResource(query))
  }, [dispatch, Auth.token])

  useEffect(() => {
    initOptionResource()
  }, [initOptionResource])

  useEffect(() => {
    setState(prev => ({ ...prev, resources: data }))
  }, [visible, data])

  useEffect(() => {
    form.resetFields()
  }, [form, visible])

  const closeModal = useCallback(() => {
    onClose()
  }, [onClose])

  const handleItemChange = (values) => {
    const selectedResources = []
    const resources = [...Master.resource.options]

    values.forEach(r_id => {
      const item = resources.find(r => r.value === r_id)
      selectedResources.push(item)
    })

    setState({ ...state, resources: selectedResources })
  }

  const handleMove = (index, action) => {
    const copyValues = [...state.resources]

    const newPositions = array_move(copyValues, index, index + action)

    setState({ ...state, resources: newPositions })
  }

  const handleApply = () => {
    console.log('prev', data)
    console.log('curr', state.resources)

    onClose(state.resources)
  }

  const onFilterOption = (input, option) => {
    return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
  }

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    }
  }

  const EditForm = ({ baseData }) => {
    return (
      <Form
        {...formItemLayout}
        form={form}
        name='playlistEditResource'
        layout='horizontal'
        autoComplete='off'
        initialValues={{
          resource_id: baseData
        }}
      >
        <Form.Item
          name='resource_id'
          label='Resource'
        >
          <Select
            showSearch
            allowClear
            mode='multiple'
            onChange={handleItemChange}
            options={Master.resource.options}
            filterOption={onFilterOption}
          />
        </Form.Item>
      </Form>
    )
  }

  return (
    <Modal
      title={<Title label="Resource" />}
      visible={visible}
      onCancel={closeModal}
      width={600}
      footer={[
        <div key='submit' className='flex justify-end'>
          <Button
            onClick={handleApply}
            type='primary'
            style={{ width: 100 }}
          >
            Apply
          </Button>
        </div>
      ]}
    >
      <EditForm baseData={data} />

      {state.resources.length ? (
        <div className='m-auto px-16'>
          <div className='mb-2'>
            <p className='m-0 font-bold'>Queue</p>
          </div>

          <div className='grid grid-cols-1 gap-4'>
            {state.resources.map((item, index) => (
              <div key={item.value} className='flex items-center'>
                <p className='m-0 mr-3 pr-3 border-r h-full'>{index + 1}</p>

                <div
                  className='w-full flex items-center justify-between py-3 px-4 border border-opacity-50 rounded hover:border-opacity-100 hover:border-blue-400'
                >
                  <div className='flex'>
                    <p className='m-0'>{item.label}</p>
                  </div>

                  <div className='flex flex-col'>
                    {(index > 0) && (
                      <Button
                        onClick={() => handleMove(index, -1)}
                        icon={<UpOutlined />}
                        size='small'
                      />
                    )}

                    {(index >= 0 && index !== state.resources.length - 1) && (
                      <Button
                        onClick={() => handleMove(index, 1)}
                        icon={<DownOutlined />}
                        size='small'
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </Modal>
  )
}

export default EditResource