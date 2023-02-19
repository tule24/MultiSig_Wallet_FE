import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    contract: null,
    signer: null
}

const Web3Slice = createSlice({
    name: 'Web3Slice',
    initialState,
    reducers: {
        updateWeb3: (state, action) => {
            const { payload } = action
            state = { ...payload }
        }
    }
})

const { actions, reducer } = Web3Slice
export const { updateWeb3 } = actions
export default reducer

