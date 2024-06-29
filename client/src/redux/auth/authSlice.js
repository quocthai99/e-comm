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
            console.log(action)
            state.login.isFetching = false
            state.login.success = true
            state.login.accessToken = action.payload.accessToken
            state.login.currentUser = action.payload.user
        },
        loginFailed: (state) => {
            state.login.isFetching = false
            state.login.error = true
        },
        
    }
})

export const { registerStart, registerSuccess, registerFailed, loginStart, loginSuccess, loginFailed } = authSlice.actions
export default authSlice.reducer