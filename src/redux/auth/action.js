const { createAction } = require("@reduxjs/toolkit");

export const checkAuthorization = createAction("AUTHORIZATION_CHECKED");
export const removeAuthorization = createAction("AUTHORIZATION_REMOVED");
export const logout = createAction("LOGOUT");

export const setToken = createAction("TOKEN_SET");
export const setUser = createAction("USER_SET");

export const requestLogin = createAction("LOGIN_REQUESTED");
export const successLogin = createAction("LOGIN_SUCCESS");
export const failureLogin = createAction("LOGIN_FAILURE");