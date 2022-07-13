import { configureStore } from '@reduxjs/toolkit'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'

import reducer from './rootReducer'

const history = createBrowserHistory()
const routeMiddleware = routerMiddleware(history)

const store = configureStore({
  reducer: reducer(history),
  middleware: [routeMiddleware],
})

export { store, history }