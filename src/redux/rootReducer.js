import { combineReducers } from 'redux'
import { connectRouter } from "connected-react-router"

import App from './app/reducer'
import Auth from './auth/reducer'

const createRootReducer = (history) =>
  combineReducers({
    App,
    Auth,
    router: connectRouter(history)
  })

export default createRootReducer