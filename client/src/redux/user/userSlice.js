import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    getUsers: {
        isFetching: false,
        success: false,
        users: null,
        error: false,
        counts: null
    },
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUsersStart: (state) => {
            state.getUsers.isFetching = true
        },
        getUsersSuccess: (state, action) => {
            state.getUsers.isFetching = false
            state.getUsers.users = action.payload.users.filter(user => !user.isAdmin)
            state.getUsers.success = true
            state.getUsers.error = false
            state.getUsers.counts = action.payload.counts
        },
        getUsersFaild: (state) => {
            state.getUsers.isFetching = false
            state.getUsers.users = null
            state.getUsers.success = false
            state.getUsers.error = true
        },
    }
})

export const {  getUsersStart, getUsersSuccess, getUsersFaild } = userSlice.actions
export default userSlice.reducer