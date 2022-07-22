import { combineReducers } from 'redux'
import { connectRouter } from "connected-react-router"

import App from './app/reducer'
import Auth from './auth/reducer'
import Master from './master/reducer'
import Playlist from './playlist/reducer'

const createRootReducer = (history) =>
  combineReducers({
    App,
    Auth,
    Master,
    Playlist,
    router: connectRouter(history)
  })

export default createRootReducer