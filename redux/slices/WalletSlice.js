import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    wallet: null
}

const WalletSlice = createSlice({
    name: 'WalletSlice',
    initialState,
    reducers: {
        updateWallet: (state, action) => {
            const { payload } = action
            state.wallet = { ...payload }
        }
    }
})

const { actions, reducer } = WalletSlice
export const { updateWallet } = actions
export default reducer