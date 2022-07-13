import { combineReducers } from 'redux'
import { connectRouter } from "connected-react-router"

import App from './app/reducer'

const createRootReducer = (history) =>
  combineReducers({
    App,
    router: connectRouter(history)
  })

export default createRootReducer