import {
  startLoading,
  errorLoading,
  finishLoading,
} from '../../utils/reducerUtils'

import {
  setToken,
  setUser,
  failureLogin,
  requestLogin,
  successLogin,
} from './action'

const initialState = {
  token: null,
  user: {
    profile: {},
    role: {}
  }
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case setToken.type:
      return {
        ...state,
        token: action.payload,
      }
    case setUser.type:
      return {
        ...state,
        user: action.payload
      }
    case requestLogin.type:
      return {
        ...startLoading(state)
      }
    case successLogin.type:
      return {
        ...finishLoading(state),
        token: action.payload
      }
    case failureLogin.type:
      return {
        ...errorLoading(state, action.payload.message)
      }
    default:
      return state
  }
}

export default authReducer