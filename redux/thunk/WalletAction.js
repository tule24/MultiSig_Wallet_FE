import { walletServices } from '../services'
import { updateWallet } from '../slices/WalletSlice'
import { delWallet, getUserVoteThunk, updateUserThunk } from '../thunk/UserAction'
import { setContractWallet } from '../thunk/Web3Action'
import { StatusCodes } from 'http-status-codes'
import { toast } from 'react-toastify'
import { weiToEth, strToEth, sleep } from '../utils'
import { getAllIDOfWallet } from './ProposalAction'
import { updateLoading } from '../slices/LoaderSlice'

export const createWallet = (router, walletObj) => async (dispatch, getState) => {
    try {
        dispatch(updateLoading(true))
        const { owners, approvalsRequired } = walletObj
        const { contractFactory } = getState().Web3Reducer
        const transaction = await contractFactory.createWallet(owners, approvalsRequired)
        const receipt = await transaction.wait()
        const address = receipt.events[0].args.addressWallet
        const { data, status } = await walletServices.createWallet({ address, owners, approvalsRequired })
        if (status === StatusCodes.CREATED) {
            dispatch(updateUserThunk(address))
            dispatch(updateLoading(false))
            router.push('/')
            toast.success(`😁 A new multisig wallet create successfully 😁`)
        } else {
            console.log(data)
        }
    } catch (err) {
        console.log(err)
        dispatch(updateLoading(false))
        toast.error(`😭 Something wrong when create wallet 😭`)
    }
}

export const getWalletDetail = (field, val) => async (dispatch) => {
    try {
        const { data, status } = await walletServices.getWallet(field, val)
        if (status === StatusCodes.OK) {
            dispatch(updateWallet(data.data[0]))
            const { address, _id } = data.data[0]
            dispatch(setContractWallet(address))
            dispatch(getAllIDOfWallet(_id))
            dispatch(getUserVoteThunk(data.data[0]))
        } else {
            console.log(status)
        }
    } catch (error) {
        console.log(error)
    }
}

export const depositWallet = (amount) => async (dispatch, getState) => {
    try {
        dispatch(closeModal())
        dispatch(updateLoading(true))
        const { signer, contractWallet, provider } = getState().Web3Reducer
        await signer.sendTransaction({ to: contractWallet.address, value: strToEth(amount.toString()) })

        sleep(1000).then(() => { })

        let balance = await provider.getBalance(contractWallet.address)
        balance = weiToEth(balance) * 1

        const { wallet } = getState().WalletReducer
        const { data, status } = await walletServices.updateWallet(wallet._id, { balance })
        if (status === StatusCodes.OK) {
            dispatch(updateWallet(data.data))
            dispatch(updateLoading(false))
            toast.success(`😁 Deposit ${amount} ETH to current wallet successfully 😁`)
        } else {
            console.log(data)
        }
    } catch (err) {
        console.log(err)
        dispatch(updateLoading(false))
        toast.error(`😭 Something wrong when deposit to current wallet 😭`)
    }
}

export const updateWalletThunk = (event, args) => async (dispatch, getState) => {
    try {
        const { wallet } = getState().WalletReducer
        const walletObj = { pendingId: wallet.pendingId - 1 }
        if (args.success) {
            walletObj.successId = wallet.successId + 1
        } else {
            walletObj.failedId = wallet.failedId + 1
        }

        let delOwners
        if (event === 'ResolveTrans') {
            walletObj.balance = weiToEth(args.balance) * 1
            walletObj.balanceLock = weiToEth(args.balanceLock) * 1
        } else if (event === 'ResolveCons' && args.success) {
            const addOwners = args.addOwners.map(address => address.toLowerCase())
            delOwners = args.delOwners.map(address => address.toLowerCase())
            const approvalsRequired = Number(args.approvalsRequired)
            const owners = wallet.owners

            const newOwners = owners.filter(address => !(delOwners.includes(address))).concat(addOwners)

            walletObj.approvalsRequired = approvalsRequired
            walletObj.owners = newOwners
        }

        const { data, status } = await walletServices.updateWallet(wallet._id, walletObj)
        if (status === StatusCodes.OK) {
            dispatch(updateWallet(data.data))
            dispatch(getUserVoteThunk(data.data))
            dispatch(delWallet(delOwners, wallet.address))
        } else {
            console.log(status)
        }
    } catch (error) {
        console.log(error)
    }
}

export const resetWalletInfo = () => async (dispatch) => {
    try {
        dispatch(updateWallet({}))
    } catch (error) {
        console.log(error)
    }
}