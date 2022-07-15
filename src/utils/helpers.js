import cookie from "react-cookies"

export const TOKEN = "token"

export const clearToken = () => {
  cookie.remove(TOKEN, { path: "/" });
}

export const getToken = () => {
  try {
    const tokenID = cookie.load(TOKEN)
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

  if (response.status === 403) {
    clearToken()
    window.location.reload()
  }

  const error = new Error()

  error.message = 'Error'

  throw error
}

export const buildHeaders = (headers = {}) => {
  const requestHeaders = Object.assign(
    {
      Accept: "application/json",
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`
    },
    headers
  );

  return requestHeaders;
}