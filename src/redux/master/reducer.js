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
  failureListPosition,
  requestListResource,
  successListResource,
  failureListResource,
  requestDeleteCompany,
  successDeleteCompany,
  failureDeleteCompany,
  requestCreateCompany,
  successCreateCompany,
  failureCreateCompany,
  requestCreateRegion,
  successCreateRegion,
  failureCreateRegion,
  requestDeleteRegion,
  successDeleteRegion,
  failureDeleteRegion,
  requestListPromo,
  successListPromo,
  failureListPromo,
  requestCreatePromo,
  successCreatePromo,
  failureCreatePromo,
  requestDeletePromo,
  successDeletePromo,
  failureDeletePromo,
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
  },
  promo: {
    data: []
  }
}

const masterReducer = (state = initialState, action) => {
  switch (action.type) {
    case requestListPromo.type:
      return {
        ...state,
        promo: {
          ...startLoading(state.promo)
        }
      }
    case successListPromo.type:
      return {
        ...state,
        promo: {
          ...finishLoading(state.promo),
          data: action.payload.data
          && action.payload.data.length
          && action.payload.data.map(item => {
            let data = {
              ...item,
              ...item.promo,
            }

            return data
          })
        }
      }
    case failureListPromo.type:
      return {
        ...state,
        promo: {
          ...errorLoading(state.promo, action.payload.message)
        }
      }
    case requestCreatePromo.type:
      return {
        ...state,
        promo: {
          ...startLoading(state.promo)
        }
      }
    case successCreatePromo.type:
      return {
        ...state,
        reload: true,
        promo: {
          ...finishLoading(state.promo),
        }
      }
    case failureCreatePromo.type:
      return {
        ...state,
        promo: {
          ...errorLoading(state.promo, action.payload.message)
        }
      }
    case requestDeletePromo.type:
      return {
        ...state,
        promo: {
          ...startLoading(state.promo)
        }
      }
    case successDeletePromo.type:
      return {
        ...state,
        reload: true,
        promo: {
          ...finishLoading(state.promo)
        }
      }
    case failureDeletePromo.type:
      return {
        ...state,
        promo: {
          ...errorLoading(state.promo, action.payload.message)
        }
      }
    case requestListResource.type:
      return {
        ...state,
        // reload: false,
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
        // reload: false,
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
    case failureListPosition.type:
      return {
        ...state,
        position: {
          ...errorLoading(state.position, action.payload.message)
        }
      }
    case requestListDevice.type:
      return {
        ...state,
        // reload: false,
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
        // reload: false,
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
        reload: false,
        region: {
          ...startLoading(state.region)
        }
      }
    case successListRegion.type:
      return {
        ...state,
        region: {
          ...finishLoading(state.region),
          data: action.payload.data
            && action.payload.data.length
            && action.payload.data.map(item => {
              const data = {
                ...item,
                ...item.region
              }

              return data
            })
        }
      }
    case failureListRegion.type:
      return {
        ...state,
        region: {
          ...errorLoading(state.region, action.payload.message)
        }
      }
    case requestCreateRegion.type:
      return {
        ...state,
        region: {
          ...startLoading(state.region)
        }
      }
    case successCreateRegion.type:
      return {
        ...state,
        reload: true,
        region: {
          ...finishLoading(state.region)
        }
      }
    case failureCreateRegion.type:
      return {
        ...state,
        region: {
          ...errorLoading(state.region, action.payload.message)
        }
      }
    case requestDeleteRegion.type:
      return {
        ...state,
        region: {
          ...startLoading(state.region)
        }
      }
    case successDeleteRegion.type:
      return {
        ...state,
        region: {
          ...finishLoading(state.region)
        },
        reload: true
      }
    case failureDeleteRegion.type:
      return {
        ...state,
        region: {
          ...errorLoading(state.region, action.payload.message)
        }
      }
    case requestListCompany.type:
      return {
        ...state,
        reload: false,
        company: {
          ...startLoading(state.company)
        }
      }
    case successListCompany.type:
      return {
        ...state,
        company: {
          ...finishLoading(state.company),
          data: action.payload.data,
          options: action.payload.data && action.payload.data.length && action.payload.data.map(data => ({ label: data.company_name, value: data.company_id }))
        }
      }
    case failureListCompany.type:
      return {
        ...state,
        company: {
          ...errorLoading(state.company, action.payload.message)
        }
      }
    case requestCreateCompany.type:
      return {
        ...state,
        company: {
          ...startLoading(state.company)
        }
      }
    case successCreateCompany.type:
      return {
        ...state,
        company: {
          ...finishLoading(state.company)
        },
        reload: true
      }
    case failureCreateCompany.type:
      return {
        ...state,
        company: {
          ...errorLoading(state.company)
        }
      }
    case requestDeleteCompany.type:
      return {
        ...state,
        company: {
          ...startLoading(state.company)
        }
      }
    case successDeleteCompany.type:
      return {
        ...state,
        company: {
          ...finishLoading(state.company)
        },
        reload: true
      }
    case failureDeleteCompany.type:
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