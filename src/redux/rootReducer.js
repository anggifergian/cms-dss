import { combineReducers } from 'redux'
import { connectRouter } from "connected-react-router"

import App from './app/reducer'
import Auth from './auth/reducer'
import Master from './master/reducer'

const createRootReducer = (history) =>
  combineReducers({
    App,
    Auth,
    Master,
    router: connectRouter(history)
  })

export default createRootReducer