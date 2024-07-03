import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // getCurrent: {
    //     isFetching: false,
    //     success: false,
    //     user: null,
    //     error: false
    // },
    getUsers: {
        isFetching: false,
        success: false,
        users: null,
        error: false
    },
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // getCurrentStart: (state) => {
        //     state.getCurrent.isFetching = true
        // },
        // getCurrentSuccess: (state, action) => {
        //     console.log(action.payload)
        //     state.getCurrent.isFetching = false
        //     state.getCurrent.user = action.payload.user
        //     state.getCurrent.success = true
        //     state.getCurrent.error = false
        // },
        // getCurrentFaild: (state) => {
        //     state.getCurrent.isFetching = false
        //     state.getCurrent.user = null
        //     state.getCurrent.success = false
        //     state.getCurrent.error = true
        // },
        getUsersStart: (state) => {
            state.getUsers.isFetching = true
        },
        getUsersSuccess: (state, action) => {
            state.getUsers.isFetching = false
            state.getUsers.users = action.payload.users.filter(user => !user.isAdmin)
            state.getUsers.success = true
            state.getUsers.error = false
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