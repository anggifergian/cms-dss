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
  requestCreateBranch,
  successCreateBranch,
  failureCreateBranch,
  requestDeleteBranch,
  successDeleteBranch,
  failureDeleteBranch,
  requestCreateDevice,
  successCreateDevice,
  failureCreateDevice,
  requestDeleteDevice,
  successDeleteDevice,
  failureDeleteDevice,
  requestCreatePosition,
  successCreatePosition,
  failureCreatePosition,
  requestDeletePosition,
  successDeletePosition,
  failureDeletePosition,
  requestCreateResource,
  successCreateResource,
  failureCreateResource,
  requestDeleteResource,
  successDeleteResource,
  failureDeleteResource,
  requestListUser,
  successListUser,
  failureListUser,
  requestDeleteUser,
  successDeleteUser,
  failureDeleteUser,
  requestCreateUser,
  successCreateUser,
  failureCreateUser,
  requestChangePassword,
  successChangePassword,
  failureChangePassword,
  requestFileImage,
  successFileImage,
  failureFileImage,
  requestGetConfig,
  successGetConfig,
  failureGetConfig,
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
  },
  user: {
    data: []
  },
  file: {
    data: ''
  },
  config: {
    data: {}
  }
}

const masterReducer = (state = initialState, action) => {
  switch (action.type) {
    case requestGetConfig.type:
      return {
        ...state,
        config: {
          ...startLoading(state.config)
        }
      }
    case successGetConfig.type:
      return {
        ...state,
        config: {
          ...finishLoading(state.config)
        }
      }
    case failureGetConfig.type:
      return {
        ...state,
        config: {
          ...errorLoading(state.config)
        }
      }
    case requestFileImage.type:
      return {
        ...state,
        file: {
          ...startLoading(state.file)
        }
      }
    case successFileImage.type:
      return {
        ...state,
        file: {
          ...finishLoading(state.file),
          data: action.payload.data.file_base64
        }
      }
    case failureFileImage.type:
      return {
        ...state,
        file: {
          ...errorLoading(state.file)
        }
      }
    case requestChangePassword.type:
      return {
        ...state,
        user: {
          ...startLoading(state.user)
        }
      }
    case successChangePassword.type:
      return {
        ...state,
        reload: true,
        user: {
          ...finishLoading(state.user)
        }
      }
    case failureChangePassword.type:
      return {
        ...state,
        user: {
          ...errorLoading(state.user, action.payload.message)
        }
      }
    case requestListUser.type:
      return {
        ...state,
        reload: false,
        user: {
          ...startLoading(state.user)
        }
      }
    case successListUser.type:
      return {
        ...state,
        user: {
          ...finishLoading(state.user),
          data: action.payload.data
        }
      }
    case failureListUser.type:
      return {
        ...state,
        user: {
          ...errorLoading(state.user)
        }
      }
    case requestDeleteUser.type:
      return {
        ...state,
        user: {
          ...startLoading(state.user)
        }
      }
    case successDeleteUser.type:
      return {
        ...state,
        reload: true,
        user: {
          ...finishLoading(state.user)
        }
      }
    case failureDeleteUser.type:
      return {
        ...state,
        user: {
          ...errorLoading(state.user)
        }
      }
    case requestCreateUser.type:
      return {
        ...state,
        user: {
          ...startLoading(state.user)
        }
      }
    case successCreateUser.type:
      return {
        ...state,
        reload: true,
        user: {
          ...finishLoading(state.user)
        }
      }
    case failureCreateUser.type:
      return {
        ...state,
        user: {
          ...errorLoading(state.user)
        }
      }
    case requestListPromo.type:
      return {
        ...state,
        reload: false,
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
                ...item.branch,
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
        reload: false,
        resource: {
          ...startLoading(state.position)
        }
      }
    case successListResource.type:
      const resources = action.payload.data
      return {
        ...state,
        resource: {
          ...finishLoading(state.position),
          data: resources,
          options: resources.map(data => ({ label: data.resource_name, value: data.resource_id }))
        }
      }
    case failureListResource.type:
      return {
        ...state,
        resource: {
          ...errorLoading(state.position, action.payload.message)
        }
      }
    case requestCreateResource.type:
      return {
        ...state,
        resource: {
          ...startLoading(state.resource)
        }
      }
    case successCreateResource.type:
      return {
        ...state,
        reload: true,
        resource: {
          ...finishLoading(state.resource)
        }
      }
    case failureCreateResource.type:
      return {
        ...state,
        resource: {
          ...errorLoading(state.resource, action.payload.message)
        }
      }
    case requestDeleteResource.type:
      return {
        ...state,
        resource: {
          ...startLoading(state.resource)
        }
      }
    case successDeleteResource.type:
      return {
        ...state,
        reload: true,
        resource: {
          ...finishLoading(state.resource)
        }
      }
    case failureDeleteResource.type:
      return {
        ...state,
        resource: {
          ...errorLoading(state.resource, action.payload.message)
        }
      }
    case requestListPosition.type:
      return {
        ...state,
        reload: false,
        position: {
          ...startLoading(state.position)
        }
      }
    case successListPosition.type:
      const positions = action.payload.data
        && action.payload.data.length
        && action.payload.data.map(item => {
          const data = {
            ...item,
            ...item.position
          }

          return data
        })

      // console.log(positions)

      return {
        ...state,
        position: {
          ...finishLoading(state.position),
          data: positions,
          options: positions.map(data => ({
            label: `${data.device_name} - ${data.box}`,
            value: data.position_id
          }))
        }
      }
    case failureListPosition.type:
      return {
        ...state,
        position: {
          ...errorLoading(state.position, action.payload.message)
        }
      }
    case requestCreatePosition.type:
      return {
        ...state,
        position: {
          ...startLoading(state.position)
        }
      }
    case successCreatePosition.type:
      return {
        ...state,
        reload: true,
        position: {
          ...finishLoading(state.position)
        }
      }
    case failureCreatePosition.type:
      return {
        ...state,
        position: {
          ...errorLoading(state.position, action.payload.message)
        }
      }
    case requestDeletePosition.type:
      return {
        ...state,
        position: {
          ...startLoading(state.position)
        }
      }
    case successDeletePosition.type:
      return {
        ...state,
        reload: true,
        position: {
          ...finishLoading(state.position)
        }
      }
    case failureDeletePosition.type:
      return {
        ...state,
        position: {
          ...errorLoading(state.position, action.payload.message)
        }
      }
    case requestListDevice.type:
      return {
        ...state,
        reload: false,
        device: {
          ...startLoading(state.device)
        }
      }
    case successListDevice.type:
      const devices = action.payload.data;

      return {
        ...state,
        device: {
          ...finishLoading(state.device),
          data: devices,
          options: devices.map(data => ({ label: data.device_name, value: data.device_id }))
        }
      }
    case failureListDevice.type:
      return {
        ...state,
        device: {
          ...errorLoading(state.device, action.payload.message)
        }
      }
    case requestCreateDevice.type:
      return {
        ...state,
        device: {
          ...startLoading(state.device)
        }
      }
    case successCreateDevice.type:
      return {
        ...state,
        reload: true,
        device: {
          ...finishLoading(state.device)
        }
      }
    case failureCreateDevice.type:
      return {
        ...state,
        device: {
          ...errorLoading(state.device, action.payload.message)
        }
      }
    case requestDeleteDevice.type:
      return {
        ...state,
        device: {
          ...startLoading(state.device)
        }
      }
    case successDeleteDevice.type:
      return {
        ...state,
        reload: true,
        device: {
          ...finishLoading(state.device)
        }
      }
    case failureDeleteDevice.type:
      return {
        ...state,
        device: {
          ...errorLoading(state.device, action.payload.message)
        }
      }
    case requestListBranch.type:
      return {
        ...state,
        reload: false,
        branch: {
          ...startLoading(state.branch)
        }
      }
    case successListBranch.type:
      const branches = action.payload.data.map(item => {
        const data = {
          ...item,
          ...item.branch
        }

        return data
      })

      const branchOptions = branches.map(data => ({ label: data.branch_name, value: data.branch_id }))

      if (branchOptions.length) {
        branchOptions.unshift({ label: 'All', value: 'all' })
      }

      return {
        ...state,
        branch: {
          ...finishLoading(state.branch),
          data: branches,
          options: branches && branches.length
            ? branchOptions
            : []
        }
      }
    case failureListBranch.type:
      return {
        ...state,
        branch: {
          ...errorLoading(state.branch, action.payload.message)
        }
      }
    case requestCreateBranch.type:
      return {
        ...state,
        branch: {
          ...startLoading(state.branch)
        }
      }
    case successCreateBranch.type:
      return {
        ...state,
        reload: true,
        branch: {
          ...finishLoading(state.branch)
        }
      }
    case failureCreateBranch.type:
      return {
        ...state,
        branch: {
          ...errorLoading(state.branch, action.payload.message)
        }
      }
    case requestDeleteBranch.type:
      return {
        ...state,
        branch: {
          ...startLoading(state.branch)
        }
      }
    case successDeleteBranch.type:
      return {
        ...state,
        reload: true,
        branch: {
          ...finishLoading(state.branch)
        }
      }
    case failureDeleteBranch.type:
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
      const regions = action.payload.data
        && action.payload.data.length
        && action.payload.data.map(item => {
          const data = {
            ...item,
            ...item.region
          }

          return data
        })

      const regionOptions = regions.map(data => ({ label: data.region_name, value: data.region_id }))

      if (regionOptions.length) {
        regionOptions.unshift({ label: 'All', value: 'all' })
      }

      return {
        ...state,
        region: {
          ...finishLoading(state.region),
          data: regions,
          options: regions && regions.length
            ? regionOptions
            : []
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
      const companies = action.payload.data

      return {
        ...state,
        company: {
          ...finishLoading(state.company),
          data: companies,
          options: companies.map(data => ({ label: data.company_name, value: data.company_id }))
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