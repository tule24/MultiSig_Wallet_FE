import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: false
}

const LoaderSlice = createSlice({
    name: 'LoaderSlice',
    initialState,
    reducers: {
        updateLoading: (state, action) => {
            state.loading = action.payload
        }
    }
})

const { actions, reducer } = LoaderSlice
export const { updateLoading } = actions
export default reducer
