export const HOST = import.meta.env.VITE_SERVER_URL

export const AUTH_ROUTES = 'api/v1/auth'
export const SIGNUP_ROUTE = `${AUTH_ROUTES}/signup`
export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`
export const GET_USER_INFO = `${AUTH_ROUTES}/user-info`
export const UPDATE_PROFILE_ROUTE = `${AUTH_ROUTES}/update-profile`
export const UPLOAD_PROFILE_IMAGE = `${AUTH_ROUTES}/upload-profile-image`
export const REMOVE_PROFILE_IMAGE = `${AUTH_ROUTES}/remove-profile-image`
export const GET_PROFILE_IMAGE = `${AUTH_ROUTES}/get-profile-image`