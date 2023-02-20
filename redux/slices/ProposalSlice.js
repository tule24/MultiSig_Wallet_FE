import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    proposals: []
}

const ProposalSlice = createSlice({
    name: 'UserSlice',
    initialState,
    reducers: {
        updateProposal: (state, action) => {
            state.proposals = [...action.payload]
        }
    }
})

const { actions, reducer } = ProposalSlice
export const { updateProposal } = actions
export default reducer
