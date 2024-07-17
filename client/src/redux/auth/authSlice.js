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
        error: false,
        success: false,
    },
    logout: {
        isFetching: false,
        error: false,
    },
    getCurrent: {
        isFetching: false,
        success: false,
        user: null,
        error: false
    },
    addToCart: {
        cart: []
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
            state.login.currentUser = action.payload.user
        },
        loginFailed: (state) => {
            state.login.isFetching = false
            state.login.error = true
        },
        logoutStart: (state) => {
            state.logout.isFetching = true
        },
        logoutSuccess: (state) => {
            state.logout.isFetching = false
            state.login.currentUser = null
            state.getCurrent.user = null
            state.login.success = false
        },
        logoutFailed: (state) => {
            state.logout.isFetching = false
            state.logout.error = true
        },
        getCurrentStart: (state) => {
            state.getCurrent.isFetching = true
        },
        getCurrentSuccess: (state, action) => {
            state.getCurrent.isFetching = false
            state.getCurrent.user = action.payload.user
            state.getCurrent.success = true
            state.getCurrent.error = false
        },
        getCurrentFaild: (state) => {
            state.getCurrent.isFetching = false
            state.getCurrent.user = null
            state.getCurrent.success = false
            state.getCurrent.error = true
        },
        // addCartSuccess: (state, action) => {
        //     state.addToCart.cart = action.payload.userCart.cart
        // },
    }
})

export const { addCartSuccess, logoutStart, logoutSuccess, logoutFailed, registerStart, registerSuccess, registerFailed, loginStart, loginSuccess, loginFailed, getCurrentStart, getCurrentSuccess, getCurrentFaild } = authSlice.actions
export default authSlice.reducer