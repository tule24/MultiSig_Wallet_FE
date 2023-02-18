import { walletServices } from '../services/WalletServices'
import { getDataWallet } from '../slices/WalletSlice'
import { StatusCodes } from 'http-status-codes'
import { toast } from 'react-toastify'

export const createWallet = (walletObj) => async (dispatch) => {
    try {
        const { data, status } = await walletServices.createWallet(walletObj)
        if (status === StatusCodes.CREATED) {
            dispatch(getDataWallet(data.data))
            toast.success(`😁 A new multisig wallet create successfully 😁`)
        } else {
            console.log(data)
        }
    } catch (err) {
        console.log(err)
        toast.error(`😭 Something wrong when create wallet 😭`)
    }
}