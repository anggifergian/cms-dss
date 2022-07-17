import {
  startLoading,
  errorLoading,
  finishLoading,
} from '../../utils/reducerUtils'

import {
  requestListCompany,
  successListCompany,
  failureListCompany,
} from './action'

const initialState = {
  reload: false,
  company: {
    data: []
  }
}

const masterReducer = (state = initialState, action) => {
  switch (action.type) {
    case requestListCompany.type:
      return {
        ...state,
        company: {
          ...startLoading(state.company)
        }
      }
    case successListCompany.type:
      return {
        ...state,
        company: {
          ...finishLoading(state.company)
        }
      }
    case failureListCompany.type:
      return {
        ...state,
        company: {
          ...errorLoading(state.company)
        }
      }
    default:
      return state
  }
}

export default masterReducer