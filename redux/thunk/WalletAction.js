import { walletServices } from '../services'
import { updateWallet } from '../slices/WalletSlice'
import { updateWeb3 } from '../slices/Web3Slice'
import { updateUserThunk } from '../thunk/UserAction'
import { StatusCodes } from 'http-status-codes'
import { toast } from 'react-toastify'
import { fetchContract, weiToEth, strToEth } from '../utils'
import { MultiSigWalletABI } from '../contracts'

export const createWallet = (walletObj) => async (dispatch, getState) => {
    try {
        const { owners, approvalRequired } = walletObj
        // const { signer, contractFactory } = getState().Web3Reducer
        // const transaction = await contractFactory.createWallet(owners, approvalRequired)
        // const receipt = await transaction.wait()
        // const address = receipt.events[0].args.addressWallet
        const address = '0x0c89E37577FbE589c76599B0B2F30BdCD7c76c20'
        const { data, status } = await walletServices.createWallet({ address, owners, approvalRequired })
        if (status === StatusCodes.CREATED) {
            dispatch(updateWallet(data.data))
            dispatch(updateUserThunk(address))
            // const contractWallet = fetchContract(address, MultiSigWalletABI, signer)
            // dispatch(updateWeb3({ contractWallet }))
            toast.success(`😁 A new multisig wallet create successfully 😁`)
        } else {
            console.log(data)
        }
    } catch (err) {
        console.log(err)
        toast.error(`😭 Something wrong when create wallet 😭`)
    }
}

export const getWalletDetail = (walletId) => async (dispatch) => {
    try {
        const { data, status } = await walletServices.getWallet(walletId)
        if (status === StatusCodes.OK) {
            dispatch(updateWallet(data.data))
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
        const { wallet } = getState().WalletReducer
        // await signer.sendTransaction({ to: contractWallet.address, value: strToEth(amount.toString()) })

        // let balance = await provider.getBalance(contractWallet.address)
        // balance = weiToEth(balance) * 1

        // const { data, status } = await walletServices.updateWallet(_id, { balance })
        const { data, status } = await walletServices.updateWallet(wallet._id, { balance: amount })

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

export const updateWalletThunk = (walletId, event, args) => async (dispatch) => {
    try {
        const res = await walletServices.getWallet(walletId)
        const wallet = res.data.data
        const walletObj = { pendingId: wallet.pendingId - 1 }
        if (args.success) {
            walletObj.successId = wallet.successId + 1
        } else {
            walletObj.failedId = wallet.failedId + 1
        }

        // if (event === 'ResolveTrans') {
        //     walletObj.balance = weiToEth(args.balance) * 1
        //     walletObj.balanceLock = weiToEth(args.balanceLock) * 1
        // } else if (event === 'ResolveCons' && args.success) {
        //     const addOwners = args.addOwners
        //     const delOwners = args.delOwners
        //     const approvalsRequired = Number(args.approvalRequired)
        //     const owners = wallet.owners

        //     const newOwners = owners.filter(address => !delOwners.find(address)).concat(addOwners)

        //     walletObj.approvalRequired = approvalsRequired
        //     walletObj.owners = newOwners
        // }

        if (event === 'ResolveTrans') {
            walletObj.balance = args.balance
            walletObj.balanceLock = args.balanceLock
        } else if (event === 'ResolveCons' && args.success) {
            const addOwners = args.addOwners
            const delOwners = args.delOwners
            const approvalsRequired = Number(args.approvalRequired)
            const owners = wallet.owners

            const newOwners = owners.filter(address => !delOwners.includes(address)).concat(addOwners)

            walletObj.approvalRequired = approvalsRequired
            walletObj.owners = newOwners
        }

        const { data, status } = await walletServices.updateWallet(walletId, walletObj)
        if (status === StatusCodes.OK) {
            dispatch(updateWallet(data.data))
        } else {
            console.log(status)
        }
    } catch (error) {
        console.log(error)
    }
}