import React, { useEffect } from 'react'
import { Layout, Menu } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'

import { privateRoutes } from "../../utils/routes"
import { changeCurrentRoute } from '../../redux/app/action'

const { Sider } = Layout
const { SubMenu } = Menu

function Sidebar({ isCollapsed }) {
  const dispatch = useDispatch()
  const history = useHistory()
  const App = useSelector(state => state.App)

  const originalCurrentLocation = window && window.location.pathname.split("/")

  const changeCurrentPage = page => dispatch(changeCurrentRoute(page))

  useEffect(() => {
    if (App.current.length && !originalCurrentLocation) return

    if (App.current[0] !== originalCurrentLocation[originalCurrentLocation.length - 1]) {
      const changeCurrentPage = page => dispatch(changeCurrentRoute([page]))
      changeCurrentPage(originalCurrentLocation[originalCurrentLocation.length - 1])
    }
  }, [App, dispatch, originalCurrentLocation])

  const handleClick = (e) => {
    changeCurrentPage([e.key])
  }

  const routes = privateRoutes

  return (
    <Sider
      width={250}
      breakpoint="lg"
      collapsible
      collapsed={isCollapsed}
      trigger={null}
      style={{
        backgroundColor: '#fff'
      }}
    >
      <div className='flex justify-center items-center my-8'>
        <h3 className='text-lg font-bold text-blue-600'>CMS DSS</h3>
      </div>

      <Menu
        onClick={handleClick}
        mode="inline"
        defaultSelectedKeys={App.current}
        defaultOpenKeys={originalCurrentLocation}
      >
        {routes.map(item => (
          item.sidebar ? (
            item.submenu ? (
              <SubMenu
                key={item.key}
                title={item.title}
              >
                {item.submenu.map(subItem => (
                  <Menu.Item
                    key={subItem.key}
                    className={subItem.key !== App.current[0] ? 'text-gray-500' : 'text-blue-500'}
                  >
                    <Link id={`menu-${subItem.key}`} to={subItem.path}>
                      {subItem.title}
                    </Link>
                  </Menu.Item>
                ))}
              </SubMenu>
            ) : (
              <Menu.Item
                key={item.key}
                className={item.key !== App.current[0] ? 'text-gray-500' : 'text-blue-500'}
              >
                <Link id={`menu-${item.key}`} to={item.path}>
                  {item.title}
                </Link>
              </Menu.Item>
            )
          ) : (<></>)
        ))}
      </Menu>
    </Sider>
  )
}

export default Sidebar