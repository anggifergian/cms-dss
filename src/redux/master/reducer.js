import {
  startLoading,
  errorLoading,
  finishLoading,
} from '../../utils/reducerUtils'

import {
  requestListCompany,
  successListCompany,
  failureListCompany,
  requestListRegion,
  successListRegion,
  failureListRegion,
  requestListBranch,
  successListBranch,
  failureListBranch,
  requestListDevice,
  successListDevice,
  failureListDevice,
  requestListPosition,
  successListPosition,
  requestListResource,
  successListResource,
  failureListResource,
} from './action'

const initialState = {
  reload: false,
  company: {
    data: []
  },
  region: {
    data: []
  },
  branch: {
    data: []
  },
  device: {
    data: []
  },
  position: {
    data: []
  },
  resource: {
    data: []
  }
}

const masterReducer = (state = initialState, action) => {
  switch (action.type) {
    case requestListResource.type:
      return {
        ...state,
        resource: {
          ...startLoading(state.position)
        }
      }
    case successListResource.type:
      console.log('resource_list', action.payload)
      return {
        ...state,
        resource: {
          ...finishLoading(state.position)
        }
      }
    case failureListResource.type:
      return {
        ...state,
        resource: {
          ...errorLoading(state.position, action.payload.message)
        }
      }
    case requestListPosition.type:
      return {
        ...state,
        position: {
          ...startLoading(state.position)
        }
      }
    case successListPosition.type:
      console.log('position_list', action.payload)
      return {
        ...state,
        position: {
          ...finishLoading(state.position)
        }
      }
    case errorLoading.type:
      return {
        ...state,
        position: {
          ...errorLoading(state.position, action.payload.message)
        }
      }
    case requestListDevice.type:
      return {
        ...state,
        device: {
          ...startLoading(state.device)
        }
      }
    case successListDevice.type:
      console.log('device_list', action.payload)
      return {
        ...state,
        device: {
          ...finishLoading(state.device)
        }
      }
    case failureListDevice.type:
      return {
        ...state,
        device: {
          ...errorLoading(state.device, action.payload.message)
        }
      }
    case requestListBranch.type:
      return {
        ...state,
        branch: {
          ...startLoading(state.branch)
        }
      }
    case successListBranch.type:
      console.log('branch_list', action.payload)
      return {
        ...state,
        branch: {
          ...finishLoading(state.branch)
        }
      }
    case failureListBranch.type:
      return {
        ...state,
        branch: {
          ...errorLoading(state.branch, action.payload.message)
        }
      }
    case requestListRegion.type:
      return {
        ...state,
        region: {
          ...startLoading(state.region)
        }
      }
    case successListRegion.type:
      console.log('region_list', action.payload)
      return {
        ...state,
        region: {
          ...finishLoading(state.region)
        }
      }
    case failureListRegion.type:
      return {
        ...state,
        region: {
          ...errorLoading(state.region, action.payload.message)
        }
      }
    case requestListCompany.type:
      return {
        ...state,
        company: {
          ...startLoading(state.company)
        }
      }
    case successListCompany.type:
      console.log('company_list', action.payload)
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
          ...errorLoading(state.company, action.payload.message)
        }
      }
    default:
      return state
  }
}

export default masterReducer