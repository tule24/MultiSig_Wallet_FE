import { userServices } from '../services'
import { updateUser, updateUserStats } from '../slices/UserSlice'
import { StatusCodes } from 'http-status-codes'
import { toast } from 'react-toastify'

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
        toast.error(`😭 Something wrong when add Wallet 😭`)
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

export const getUserVoteThunk = () => async (dispatch, getState) => {
    try {
        const { wallet } = getState().WalletReducer
        const { data, status } = await userServices.getUserVote({ walletId: wallet._id })
        if (status === StatusCodes.OK) {
            const stats = wallet.owners.map(address => {
                const res = { address }
                data.data.filter(ele => ele.voter === address).forEach(ele => {
                    if (ele.vote) {
                        res.accept = ele.count
                    } else {
                        res.reject = ele.count
                    }
                })
                res.unvote = wallet.transactionId + wallet.consensusId - res.accept - res.reject
                return res
            })
            dispatch(updateUserStats(stats))
        }
    } catch (err) {
        console.log(err)
    }
}