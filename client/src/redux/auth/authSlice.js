import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    register: {
        isFetching: false,
        error: false,
        success: false,
        message: '',
    },
    login: {
        isFetching: false,
        currentUser: null,
        accessToken: null,
        error: false,
        success: false
    },
    logout: {
        isFetching: false,
        error: false,
        message: ''
    }
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        registerStart: (state) => {
            state.register.isFetching = true
        },
        registerSuccess: (state, action) => {
            state.register.isFetching = false
            state.register.success = true
            state.register.message = action.payload.message
        },
        registerFailed: (state) => {
            state.register.isFetching = false
            state.register.error = true
        },
        loginStart: (state) => {
            state.login.isFetching = true
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false
            state.login.success = true
            state.login.accessToken = action.payload.accessToken
            state.login.currentUser = action.payload.user
        },
        loginFailed: (state) => {
            state.login.isFetching = false
            state.login.error = true
        },
        logoutStart: (state) => {
            state.logout.isFetching = true
        },
        logoutSuccess: (state, action) => {
            state.logout.isFetching = false
            state.logout.message = action.payload.message
            state.login.currentUser = null
            state.login.accessToken = null
            state.login.success = false
        },
        logoutFailed: (state) => {
            state.logout.isFetching = false
            state.logout.error = true
        },
    }
})

export const { logoutStart, logoutSuccess, logoutFailed, registerStart, registerSuccess, registerFailed, loginStart, loginSuccess, loginFailed } = authSlice.actions
export default authSlice.reducer