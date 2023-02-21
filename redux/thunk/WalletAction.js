import { walletServices } from '../services'
import { updateWallet } from '../slices/WalletSlice'
import { updateUserThunk } from '../thunk/UserAction'
import { setContractWallet } from '../thunk/Web3Action'
import { StatusCodes } from 'http-status-codes'
import { toast } from 'react-toastify'
import { weiToEth, strToEth } from '../utils'
import { getAllIDOfWallet } from './ProposalAction'

export const createWallet = (walletObj) => async (dispatch, getState) => {
    try {
        const { owners, approvalRequired } = walletObj
        const { contractFactory } = getState().Web3Reducer
        const transaction = await contractFactory.createWallet(owners, approvalRequired)
        const receipt = await transaction.wait()
        const address = receipt.events[0].args.addressWallet
        const { data, status } = await walletServices.createWallet({ address, owners, approvalRequired })
        if (status === StatusCodes.CREATED) {
            dispatch(updateUserThunk(address))
            toast.success(`😁 A new multisig wallet create successfully 😁`)
        } else {
            console.log(data)
        }
    } catch (err) {
        console.log(err)
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
        } else {
            console.log(status)
        }
    } catch (error) {
        console.log(error)
    }
}

export const depositWallet = (amount) => async (dispatch, getState) => {
    try {
        const { signer, contractWallet, provider } = getState().Web3Reducer
        await signer.sendTransaction({ to: contractWallet.address, value: strToEth(amount.toString()) })

        let balance = await provider.getBalance(contractWallet.address)
        balance = weiToEth(balance) * 1

        const { data, status } = await walletServices.updateWallet(_id, { balance })
        if (status === StatusCodes.OK) {
            dispatch(updateWallet(data.data))
            toast.success(`😁 Deposit ${amount} ETH to current wallet successfully 😁`)
        } else {
            console.log(data)
        }
    } catch (err) {
        console.log(err)
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

        if (event === 'ResolveTrans') {
            walletObj.balance = weiToEth(args.balance) * 1
            walletObj.balanceLock = weiToEth(args.balanceLock) * 1
        } else if (event === 'ResolveCons' && args.success) {
            const addOwners = args.addOwners
            const delOwners = args.delOwners
            const approvalsRequired = Number(args.approvalRequired)
            const owners = wallet.owners

            const newOwners = owners.filter(address => !delOwners.includes(address)).concat(addOwners)

            walletObj.approvalRequired = approvalsRequired
            walletObj.owners = newOwners
        }

        const { data, status } = await walletServices.updateWallet(wallet._id, walletObj)
        if (status === StatusCodes.OK) {
            dispatch(updateWallet(data.data))
        } else {
            console.log(status)
        }
    } catch (error) {
        console.log(error)
    }
}