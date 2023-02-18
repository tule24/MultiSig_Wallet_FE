import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    wallet: null
}

const WalletSlice = createSlice({
    name: 'WalletSlice',
    initialState,
    reducers: {
        getDataWallet: (state, action) => {
            const { payload } = action
            state.wallet = {...payload}
        }
    }
})

const { actions, reducer } = WalletSlice
export const { getDataWallet } = actions
export default reducer