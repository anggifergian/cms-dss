import {
  startLoading,
  finishLoading,
  errorLoading,
} from '../../utils/reducerUtils';
import { failureDeleteBranch } from '../master/action';

import {
  failureCreatePlaylist,
  failureListPlaylist,
  requestCreatePlaylist,
  requestDeletePlaylist,
  requestListPlaylist,
  successCreatePlaylist,
  successDeletePlaylist,
  successListPlaylist,
} from "./action";

const initialState = {
  reload: false,
  list: {
    data: []
  },
  create: {},
  delete: {},
}

const playlistReducer = (state = initialState, action) => {
  switch (action.type) {
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
      return  {
        ...state,
        reload: false,
        list: {
          ...startLoading(state.list)
        }
      }
    case successListPlaylist.type:
      const items = action.payload.data.map(item => {
        const data = {
          ...item,
          ...item.playlist,
          ...item.branch
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