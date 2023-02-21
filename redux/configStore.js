import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import UserReducer from './slices/UserSlice'
import WalletReducer from './slices/WalletSlice'
import Web3Reducer from './slices/Web3Slice'
import ProposalReducer from './slices/ProposalSlice'
import LoaderReducer from './slices/LoaderSlice'

export const store = configureStore({
    reducer: {
        UserReducer,
        WalletReducer,
        Web3Reducer,
        ProposalReducer,
        LoaderReducer
    },
    middleware: getDefaultMiddleware({ serializableCheck: false })
})