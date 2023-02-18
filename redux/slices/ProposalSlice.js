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
        getDataProposal: (state, action) => {

        }
    }
})

const { actions, reducer } = ProposalSlice
export const { getDataProposal } = actions
export default reducer
