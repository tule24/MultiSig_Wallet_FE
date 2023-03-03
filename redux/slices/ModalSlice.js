import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    component: null,
    open: false,
    type: ''
}

export const ModalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.component = action.payload.component
            state.open = true
            state.type = action.payload.type
        },
        closeModal: (state, action) => {
            state.open = false
            state.component = null
        }
    }
})

const { actions, reducer } = ModalSlice
export const { openModal, closeModal } = actions
export default reducer