import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

// import userSlice from './user/userSlice';
import authSlice from './auth/authSlice';
import loadingSlice from './loading/loadingSlice';

const persistConfig = {
    storage,
};

const authConfig = {
    ...persistConfig,
    key: 'auth',
    whitelist: ['login', 'getCurrent'],
};

// const userConfig = {
//     ...persistConfig,
//     key: 'user',
//     whitelist: ['getUsers'],
// };

const store = configureStore({
    reducer: {
        auth: persistReducer(authConfig, authSlice),
        // user: persistReducer(userConfig, userSlice),
        // user: userSlice
        loading: loadingSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;
