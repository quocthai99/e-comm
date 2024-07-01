import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    getCurrent: {
        isFetching: false,
        success: false,
        user: null,
        error: false
    },
    
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getCurrentStart: (state) => {
            state.getCurrent.isFetching = true
        },
        getCurrentSuccess: (state, action) => {
            console.log(action.payload)
            state.getCurrent.isFetching = false
            state.getCurrent.user = action.payload.user
            state.getCurrent.success = true
            state.getCurrent.error = false
        },
        getCurrentFaild: (state) => {
            state.getCurrent.isFetching = false
            state.getCurrent.user = null
            state.getCurrent.success = false
            state.getCurrent.error = true
        },
        
    }
})

export const { getCurrentStart, getCurrentSuccess, getCurrentFaild } = userSlice.actions
export default userSlice.reducer