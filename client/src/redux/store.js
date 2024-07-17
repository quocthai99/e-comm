import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

// import userSlice from './user/userSlice';
import authSlice from './auth/authSlice';
import loadingSlice from './loading/loadingSlice';
import cartSlice from './cart/CartSlice';

const persistConfig = {
    storage,
};

const authConfig = {
    ...persistConfig,
    key: 'auth',
    whitelist: ['login', 'getCurrent'],
};
const cartConfig = {
    ...persistConfig,
    key: 'cart',
    whitelist: ['cart'],
};

// const userConfig = {
//     ...persistConfig,
//     key: 'user',
//     whitelist: ['getUsers'],
// };

const store = configureStore({
    reducer: {
        auth: persistReducer(authConfig, authSlice),
        // auth: authSlice,
        // user: persistReducer(userConfig, userSlice),
        // cart: cartSlice,
        cart: persistReducer(cartConfig, cartSlice),
        loading: loadingSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;
