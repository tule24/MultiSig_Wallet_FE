import { userServices } from '../services'
import { updateUser, updateUserStats } from '../slices/UserSlice'
import { StatusCodes } from 'http-status-codes'
import { toast } from 'react-toastify'
import { minifyAddress } from '@/helpers'

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

export const addWallet = (wallet) => async (dispatch, getState) => {
    try {
        const { user } = getState().UserReducer
        const { contractFactory } = getState().Web3Reducer
        const isOwner = await contractFactory.ownerWallets(user.address, wallet)
        if (isOwner) {
            const wallets = [...user.wallets, wallet]
            const { data, status } = await userServices.updateUser(user._id, { wallets })
            if (status === StatusCodes.OK) {
                dispatch(updateUser(data.data))
                toast.success(`😁 Add wallet successfully 😁`)
            } else {
                console.log(status)
            }
        }
    } catch (error) {
        console.log(error)
        toast.error(`😭 Something wrong when add wallet😭`)
    }
}

export const delWallet = (users, wallet) => async (dispatch, getState) => {
    try {
        const { status } = await userServices.updateMultipleUser({ users, wallet })
        const { user } = getState().UserReducer
        if (status === StatusCodes.OK) {
            dispatch(createUser(user.address))
        } else {
            console.log(status)
        }
    } catch (error) {
        console.log(error)
    }
}

export const getUserVoteThunk = (wallet) => async (dispatch) => {
    try {
        const { data, status } = await userServices.getUserVote(wallet._id)
        if (status === StatusCodes.OK) {
            const stats = wallet.owners.map(address => {
                const res = { name: minifyAddress(address, 3), accept: 0, reject: 0 }
                data.data.filter(ele => ele.voter.toLowerCase() === address).forEach(ele => {
                    if (ele.vote) {
                        res.accept = ele.count
                    } else {
                        res.reject = ele.count
                    }
                })
                return res
            })
            dispatch(updateUserStats(stats))
        }
    } catch (err) {
        console.log(err)
    }
}

export const resetUserVote = () => async (dispatch) => {
    try {
        dispatch(updateUserStats([]))
    } catch (err) {
        console.log(err)
    }
}