import axiosConfig from '../axiosConfig'
import axios from 'axios'

import { getCurrentFaild, getCurrentStart, getCurrentSuccess } from '../redux/user/userSlice'

export const apiGetCurrent = async(accessToken, dispatch) => {
    dispatch(getCurrentStart())
    try {
        const response = await axiosConfig({
            method: 'get',
            // url: `${process.env.REACT_APP_SERVER_URL}api/user/detail-user`,
            url: `api/user/detail-user`,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
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
            // url: `api/user/refresh-token`,
            url: `${process.env.REACT_APP_SERVER_URL}api/user/refresh-token`,
            withCredentials: true
        })
        return response.data
    } catch (error) {
        return error
    }
}