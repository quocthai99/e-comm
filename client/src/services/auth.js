import axios from 'axios'

import path from '../ultils/path'
import { loginFailed, loginStart, loginSuccess } from '../redux/auth/authSlice'

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