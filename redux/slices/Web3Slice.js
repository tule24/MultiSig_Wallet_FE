import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentAccount: '0x32f2fEFa54d1D46B7960e262c53bc95004b085e5',
    provider: null,
    signer: null,
    contractWallet: null,
    contractFactory: null,
}

const Web3Slice = createSlice({
    name: 'Web3Slice',
    initialState,
    reducers: {
        updateWeb3: (state, action) => {
            const { currentAccount, contractFactory, contractWallet, signer, provider } = action.payload
            contractFactory ? state.contractFactory = contractFactory : {}
            signer ? state.signer = signer : {}
            contractWallet ? state.contractWallet = contractWallet : {}
            currentAccount ? state.currentAccount = currentAccount : {}
            provider ? state.provider = provider : {}
        }
    }
})

const { actions, reducer } = Web3Slice
export const { updateWeb3 } = actions
export default reducer

