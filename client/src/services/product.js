import axiosConfig from '../axiosConfig'
import axios from 'axios'
import { isLoaded, isLoadingStart } from '../redux/loading/loadingSlice'


export const apiCreateProduct = async(accessToken, data) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: `api/product/create-product`,
            data,
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
        })
        
        return response.data
    } catch (error) {
        return error
    }
}

export const apiGetProducts = async(accessToken) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `api/product/get-products`,
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
        })
        
        return response.data
    } catch (error) {
        return error
    }
}

export const apiAddVariant = async(data, pid, accessToken, dispatch) => {
    dispatch(isLoadingStart())
    try {
        const response = await axiosConfig({
            method: 'post',
            url: `api/product/add-variant/${pid}`,
            data,
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
        })
        dispatch(isLoaded())
        return response.data
    } catch (error) {
        return error
    }
}

export const apiUpdateProduct = async(data, pid, accessToken, dispatch) => {
    dispatch(isLoadingStart())
    try {
        const response = await axiosConfig({
            method: 'put',
            url: `api/product/update-product/${pid}`,
            data,
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
        })
        dispatch(isLoaded())
        return response.data
    } catch (error) {
        return error
    }
}

export const apiGetProduct = async(pid) => {
    try {
        const response = await axios({
            method: 'get',
            url: `${process.env.REACT_APP_SERVER_URL}api/product/get-product/${pid}`,
        })
        return response.data
    } catch (error) {
        return error
    }
}