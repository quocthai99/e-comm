import axios from 'axios'
import axiosConfig from '../axiosConfig'

export const apiRegister = async(payload) => {
    try {
        const response = await axios({
            method: 'post',
            url: `${process.env.REACT_APP_SERVER_URL}api/user/register`,
            data: payload,
        })

        return response
    } catch (error) {
        return error
    }
}

export const apiLogin = async(payload) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: `api/user/login`,
            data: payload,
        })

        return response
    } catch (error) {
        return error
    }
}