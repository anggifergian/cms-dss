import cookie from "react-cookies"
import { notification } from 'antd'

import config from "../settings/config"
import { store } from "../redux/store"

export const APP_TOKEN = "token_dss"
export const APP_USER = "user_dss"

export const isAdmin = () => {
  const { Auth } = store.getState()
  const checkAdmin = Auth.user.branch_id === 0
  return checkAdmin
}

export const clearToken = () => {
  cookie.remove(APP_TOKEN, { path: "/" });
  cookie.remove(APP_USER, { path: "/" });
}

export const getUser = () => {
  try {
    const user = cookie.load(APP_USER)
    return user
  } catch (error) {
    clearToken()
    return null
  }
}

export const getToken = () => {
  try {
    const tokenID = cookie.load(APP_TOKEN)
    return tokenID
  } catch (error) {
    clearToken()
    return null
  }
}

export const setExpired = (value) => {
  const today = new Date()
  today.setDate(today.getDate() + value)

  return today
}

export const checkStatus = (response) => {
  if (response.success) {
    return response
  }

  const error = new Error()
  error.message = response.message
  throw error
}

export const delay = ms => (
  new Promise(reject => {
    setTimeout(() => reject(new Error("Request Timeout")), ms);
  })
)

export const buildHeaders = (headers = {}) => {
  const requestHeaders = Object.assign(
    {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    headers
  );

  return requestHeaders;
}

export const buildUrl = (endpoint) => {
  const url = config.dev_api + endpoint
  return url
}

export const notifyError = (
  type = "error",
  message = "Internal Server Error",
  key = "505",
  onClose = null,
  placement = "topRight",
) => {
  notification[type]({
    message,
    placement,
    key,
    onClose
  })
}