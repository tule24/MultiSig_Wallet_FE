import { userServices } from '../services'
import { updateUser } from '../slices/UserSlice'
import { StatusCodes } from 'http-status-codes'

export const createUser = (address) => async (dispatch) => {
    try {
        const { data, status } = await userServices.login({ address })
        if (status <= StatusCodes.CREATED) {
            dispatch(updateUser(data.data))
        } else {
            console.log(status)
        }
    } catch (err) {
        console.log(err)
    }
}

export const updateUserThunk = (wallet) => async (dispatch, getState) => {
    try {
        const { user } = getState().UserReducer
        const wallets = [...user.wallets, wallet]
        const { data, status } = await userServices.updateUser(user._id, { wallets })
        if (status === StatusCodes.OK) {
            dispatch(updateUser(data.data))
        } else {
            console.log(status)
        }
    } catch (error) {
        console.log(error)
    }
} 