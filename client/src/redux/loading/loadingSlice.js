import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: {
        isFetching: false,
    },
}

const userSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        isLoadingStart: (state) => {
            state.isLoading.isFetching = true
        },
        isLoaded: (state) => {
            state.isLoading.isFetching = false
        },
    }
})

export const {  isLoadingStart, isLoaded } = userSlice.actions
export default userSlice.reducer