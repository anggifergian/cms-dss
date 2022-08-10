import {
  startLoading,
  finishLoading,
  errorLoading,
} from '../../utils/reducerUtils';
import { failureDeleteBranch } from '../master/action';

import {
  failureCreatePlaylist,
  failureListPlaylist,
  failureListPlaylistResource,
  requestCreatePlaylist,
  requestDeletePlaylist,
  requestListPlaylist,
  requestListPlaylistResource,
  successCreatePlaylist,
  successDeletePlaylist,
  successListPlaylist,
  successListPlaylistResource,
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
}

const playlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case requestListPlaylistResource.type: {
      return {
        ...state,
        resource: {
          ...startLoading(state.resource)
        }
      }
    }
    case successListPlaylistResource.type: {
      console.log('data', action.payload)

      return {
        ...state,
        resource: {
          ...finishLoading(state.resource)
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