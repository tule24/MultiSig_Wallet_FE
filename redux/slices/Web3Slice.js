import { createSlice } from '@reduxjs/toolkit'

const initialState = {
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
            const { contractFactory, contractWallet, signer, provider } = action.payload
            contractFactory ? state.contractFactory = contractFactory : {}
            signer ? state.signer = signer : {}
            contractWallet ? state.contractWallet = contractWallet : {}
            provider ? state.provider = provider : {}
        }
    }
})

const { actions, reducer } = Web3Slice
export const { updateWeb3 } = actions
export default reducer

