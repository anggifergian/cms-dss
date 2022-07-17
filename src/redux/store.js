import { configureStore } from '@reduxjs/toolkit'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './rootReducer'
import rootSaga from './rootSaga'

const history = createBrowserHistory()
const routeMiddleware = routerMiddleware(history)
const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: rootReducer(history),
  middleware: [routeMiddleware, sagaMiddleware],
})

sagaMiddleware.run(rootSaga)

export { store, history }