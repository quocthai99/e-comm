import axios from 'axios'
import axiosConfig from '../axiosConfig'

import path from '../utils/path'
import { loginFailed, loginStart, loginSuccess, logoutStart, logoutSuccess, logoutFailed } from '../redux/auth/authSlice'

export const apiRegister = async(payload) => {
    try {
        const response = await axios({
            method: 'post',
            url: `${process.env.REACT_APP_SERVER_URL}api/user/register`,
            data: payload,
        })

        return response.data
    } catch (error) {
        return error.response.data
    }
}

export const apiLogin = async(payload, dispatch, navigate) => {
    dispatch(loginStart())
    try {
        const response = await axios({
            method: 'post',
            url: `${process.env.REACT_APP_SERVER_URL}api/user/login`,
            data: payload,
            withCredentials: true
        })
        
        dispatch(loginSuccess(response.data))
        navigate(`/${path.HOME}`)
        
    } catch (error) {
        dispatch(loginFailed())
    }
}

export const apiLogout = async( accessToken, dispatch ) => {
    dispatch(logoutStart())
    try {
        const response = await axiosConfig({
            method: 'post',
            url: `api/user/logout`,
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        
        dispatch(logoutSuccess(response.data))
        
    } catch (error) {
        dispatch(logoutFailed())
    }
}