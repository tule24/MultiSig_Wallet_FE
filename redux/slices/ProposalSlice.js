import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    pending: [],
    complete: []
}

const ProposalSlice = createSlice({
    name: 'UserSlice',
    initialState,
    reducers: {
        addPendingProposal: (state, action) => {

        },
        addCompleteProposal: (state, action) => {

        },
        updateProposal: (state, action) => {

        }
    }
})

const { actions, reducer } = ProposalSlice
export const { addPendingProposal, addCompleteProposal, updateProposal } = actions
export default reducer
