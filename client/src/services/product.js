import axiosConfig from '../axiosConfig'
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