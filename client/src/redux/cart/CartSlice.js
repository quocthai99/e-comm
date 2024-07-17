import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cart: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            state.cart = action.payload
        },
        deleteItem(state, action) {},
        incrementItem(state, action) {
            const item = state.cart.find(item => item._id === action.payload)

            item.quantity++
        },
        decrementItem(state, action) {
            const item = state.cart.find(item => item._id === action.payload)

            item.quantity--
        },
        clearCart(state, action) {},
    }
})

export const { addItem, deleteItem, incrementItem, decrementItem, clearCart} = cartSlice.actions 

export default cartSlice.reducer;