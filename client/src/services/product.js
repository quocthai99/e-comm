import axiosConfig from '../axiosConfig'


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

export const apiAddVariant = async(accessToken, pid) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: `api/product/add-variant/${pid}`,
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
        })
        
        return response.data
    } catch (error) {
        return error
    }
}