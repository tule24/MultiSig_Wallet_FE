import { configureStore } from '@reduxjs/toolkit'
import UserReducer from './slices/UserSlice'
import WalletReducer from './slices/WalletSlice'
export const store = configureStore({
    reducer: {
        UserReducer,
        WalletReducer
    }
})