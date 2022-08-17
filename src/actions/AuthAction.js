import * as AuthApi from '../api/AuthRequests.js'

export const login = (FormData) => async (dispatch) => {
    dispatch({ type: "AUTH_ATART" })
    try {
        const { data } = await AuthApi.login(FormData)
        dispatch({ type: "AUTH_SUCCESS", data: data })
    } catch (error) {
        console.log(error);
        dispatch({ type: "AUTH_FAIL" })
    }
}

export const signUp = (FormData) => async (dispatch) => {
    dispatch({ type: "AUTH_ATART" })
    try {
        const { data } = await AuthApi.signUp(FormData)
        dispatch({ type: "AUTH_SUCCESS", data: data })
    } catch (error) {
        console.log(error);
        dispatch({ type: "AUTH_FAIL" })
    }
}

export const logout = () => async (dispatch) => {
    dispatch({ type: "LOG_OUT" })
}