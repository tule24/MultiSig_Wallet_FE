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