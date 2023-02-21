import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: {},
    userStats: []
}

const UserSlice = createSlice({
    name: 'UserSlice',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const { payload } = action
            state.user = { ...payload }
        },
        updateUserStats: (state, action) => {
            const { payload } = action
            state.userStats = [...payload]
        }
    }
})

const { actions, reducer } = UserSlice
export const { updateUser, updateUserStats } = actions
export default reducer

