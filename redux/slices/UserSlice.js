import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null
}

const UserSlice = createSlice({
    name: 'UserSlice',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const { payload } = action
            state.user = {...payload}
        }
    }
})

const { actions, reducer } = UserSlice
export const { updateUser } = actions
export default reducer

