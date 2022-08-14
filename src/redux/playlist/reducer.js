import {
  startLoading,
  finishLoading,
  errorLoading,
} from '../../utils/reducerUtils';
import { failureDeleteBranch } from '../master/action';

import {
  failureAddPlaylistResource,
  failureCreatePlaylist,
  failureDeletePlaylistResource,
  failureListPlaylist,
  failureListPlaylistResource,
  failureUpdatePlaylistResource,
  requestAddPlaylistResource,
  requestCreatePlaylist,
  requestDeletePlaylist,
  requestDeletePlaylistResource,
  requestListPlaylist,
  requestListPlaylistResource,
  requestUpdatePlaylistResource,
  successAddPlaylistResource,
  successCreatePlaylist,
  successDeletePlaylist,
  successDeletePlaylistResource,
  successListPlaylist,
  successListPlaylistResource,
  successUpdatePlaylistResource,
} from "./action";

const initialState = {
  reload: false,
  create: {},
  delete: {},
  list: {
    data: []
  },
  resource: {
    data: []
  },
  update: {},
}

const playlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case requestDeletePlaylistResource.type: {
      return {
        ...state,
        update: {
          ...startLoading(state.update)
        }
      }
    }
    case successDeletePlaylistResource.type: {
      console.log('delete ->', action.payload)
      return {
        ...state,
        update: {
          ...finishLoading(state.update)
        }
      }
    }
    case failureDeletePlaylistResource.type: {
      return {
        ...state,
        update: {
          ...errorLoading(state.update)
        }
      }
    }
    case requestUpdatePlaylistResource.type: {
      return {
        ...state,
        update: {
          ...startLoading(state.update)
        }
      }
    }
    case successUpdatePlaylistResource.type: {
      console.log('updated ->', action.payload)
      return {
        ...state,
        update: {
          ...finishLoading(state.update)
        }
      }
    }
    case failureUpdatePlaylistResource.type: {
      return {
        ...state,
        update: {
          ...errorLoading(state.update)
        }
      }
    }
    case requestAddPlaylistResource.type: {
      return {
        ...state,
        update: {
          ...startLoading(state.update)
        }
      }
    }
    case successAddPlaylistResource.type: {
      console.log('added ->', action.payload)

      return {
        ...state,
        update: {
          ...finishLoading(state.update)
        }
      }
    }
    case failureAddPlaylistResource.type: {
      return {
        ...state,
        update: {
          ...errorLoading(state.update)
        }
      }
    }
    case requestListPlaylistResource.type: {
      return {
        ...state,
        resource: {
          ...startLoading(state.resource)
        }
      }
    }
    case successListPlaylistResource.type: {
      const { data } = action.payload

      let options = []
      if (data.length) {
        options = data.map(pyl => {
          const { resource_id, resource_name } = pyl['resources']
          const { order, playlist_resource_id } = pyl['playlist_resource']

          return {
            order,
            playlist_resource_id,
            value: resource_id,
            label: resource_name
          }
        })
      }

      return {
        ...state,
        resource: {
          ...finishLoading(state.resource),
          data: options
        }
      }
    }
    case failureListPlaylistResource.type: {
      return {
        ...state,
        resource: {
          ...errorLoading(state.resource, action.payload.message)
        }
      }
    }
    case requestDeletePlaylist.type: {
      return {
        ...state,
        delete: {
          ...startLoading(state.delete)
        }
      }
    }
    case successDeletePlaylist.type: {
      return {
        ...state,
        reload: true,
        delete: {
          ...finishLoading(state.delete)
        }
      }
    }
    case failureDeleteBranch.type: {
      return {
        ...state,
        delete: {
          ...errorLoading(state.delete)
        }
      }
    }
    case requestCreatePlaylist.type: {
      return {
        ...state,
        create: {
          ...startLoading(state.create)
        }
      }
    }
    case successCreatePlaylist.type: {
      return {
        ...state,
        reload: true,
        create: {
          ...finishLoading(state.create)
        }
      }
    }
    case failureCreatePlaylist.type: {
      return {
        ...state,
        create: {
          ...errorLoading(state.create)
        }
      }
    }
    case requestListPlaylist.type:
      return {
        ...state,
        reload: false,
        list: {
          ...startLoading(state.list)
        }
      }
    case successListPlaylist.type:
      const items = action.payload.data.map(item => {
        const data = {
          ...item.branch,
          ...item.playlist,
        }

        return data
      })

      return {
        ...state,
        list: {
          ...finishLoading(state.list),
          data: items
        }
      }
    case failureListPlaylist.type:
      return {
        ...state,
        list: {
          ...errorLoading(state.list)
        }
      }
    default:
      return state
  }
}

export default playlistReducer