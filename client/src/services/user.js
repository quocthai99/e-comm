import axiosConfig from '../axiosConfig'
import axios from 'axios'

import { loginSuccess, getCurrentFaild, getCurrentStart, getCurrentSuccess, loginStart, addCartSuccess } from '../redux/auth/authSlice'
import { addItem } from '../redux/cart/CartSlice'

export const apiGetCurrent = async(accessToken, dispatch) => {
    dispatch(getCurrentStart())
    console.log('apiGetCurrent:', accessToken )
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `api/user/detail-user`,
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
        })
        dispatch(getCurrentSuccess(response.data))
        
    } catch (error) {
        dispatch(getCurrentFaild())
    }
}

export const apiRefresh = async() => {
    try {
        const response = await axios({
            method: 'post',
            url: `${process.env.REACT_APP_SERVER_URL}api/user/refresh-token`,
            withCredentials: true
        })
        return response.data
    } catch (error) {
        return error
    }
}

export const apiUpdateCurrent = async(accessToken, data, dispatch) => {
    dispatch(loginStart())
    try {
        const response = await axiosConfig({
            method: 'put',
            url: `api/user/update-current`,
            data,
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
        })
        
        dispatch(loginSuccess(response.data))
    } catch (error) {
        return error
    }
}

export const apiGetUsers = async(accessToken, params) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `api/user/users`,
            params,
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
        })
        return response.data
    } catch (error) {
        return error
    }
}

export const apiDeleteUser = async(accessToken, uid) => {
    try {
        const response = await axiosConfig({
            method: 'delete',
            url: `api/user/delete-user/${uid}`,
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
        })
        return response.data
    } catch (error) {
        return error
    }
}

export const apiAddToCart = async(accessToken, dispatch, data) => {
    try {
        const response = await axiosConfig({
            method: 'put',
            url: `api/user/add-cart`,
            data,
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
        })
        dispatch(addItem(response.data.userCart.cart))
    } catch (error) {
        return error
    }
}

export const apiRemoveCart = async(accessToken, dispatch, pid) => {
    try {
        const response = await axiosConfig({
            method: 'delete',
            url: `api/user/remove-cart/${pid}`,
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
        })
        dispatch(getCurrentSuccess(response.data))
        return response.data
    } catch (error) {
        return error
    }
}