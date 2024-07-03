import axiosConfig from '../axiosConfig'
import axios from 'axios'

import {  getUsersFaild, getUsersStart, getUsersSuccess } from '../redux/user/userSlice'
import { loginSuccess, getCurrentFaild, getCurrentStart, getCurrentSuccess } from '../redux/auth/authSlice'

export const apiGetCurrent = async(accessToken, dispatch) => {
    dispatch(getCurrentStart())
    console.log('apiGetCurrent:', accessToken )
    try {
        const response = await axiosConfig({
            method: 'get',
            // url: `${process.env.REACT_APP_SERVER_URL}api/user/detail-user`,
            url: `api/user/detail-user`,
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
        })
        console.log(response.data, '=> dispatch current')
        dispatch(getCurrentSuccess(response.data))
        
    } catch (error) {
        dispatch(getCurrentFaild())
    }
}

export const apiRefresh = async() => {
    try {
        const response = await axios({
            method: 'post',
            // url: `api/user/refresh-token`,
            url: `${process.env.REACT_APP_SERVER_URL}api/user/refresh-token`,
            withCredentials: true
        })
        return response.data
    } catch (error) {
        return error
    }
}

export const apiUpdateCurrent = async(accessToken, data, dispatch) => {
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

export const apiGetUsers = async(accessToken, params, dispatch) => {
    dispatch(getUsersStart())
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `api/user/users`,
            params,
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
        })
        dispatch(getUsersSuccess(response.data))
        return response.data
    } catch (error) {
        dispatch(getUsersFaild())
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