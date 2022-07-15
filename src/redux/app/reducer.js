import { getDefaultPath } from "../../utils/urlSync";
import { changeCurrentRoute } from "./action";

const preKeys = getDefaultPath();

const initialState = {
  current: preKeys
}

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case changeCurrentRoute.type:
      return {
        ...state,
        current: action.payload
    }
    default:
      return state
  }
}