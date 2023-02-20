import { walletServices } from '../services'
import { updateWallet } from '../slices/WalletSlice'
import { updateWeb3 } from '../slices/Web3Slice'
import { StatusCodes } from 'http-status-codes'
import { toast } from 'react-toastify'
import { fetchContract, weiToEth, strToEth } from '../utils'
import { MultiSigWalletABI } from '../contracts'

export const createWallet = (walletObj) => async (dispatch, getState) => {
    try {
        const { owners, approvalRequired } = walletObj
        const { signer, contractFactory } = getState().Web3Reducer
        const transaction = await contractFactory.createWallet(owners, approvalRequired)
        const receipt = await transaction.wait()
        const address = receipt.events[0].args.addressWallet

        const { data, status } = await walletServices.createWallet({ address, owners, approvalRequired })
        if (status === StatusCodes.CREATED) {
            dispatch(updateWallet(data.data))
            const contractWallet = fetchContract(address, MultiSigWalletABI, signer)
            dispatch(updateWeb3({ contractWallet }))
            toast.success(`😁 A new multisig wallet create successfully 😁`)
        } else {
            console.log(data)
        }
    } catch (err) {
        console.log(err)
        toast.error(`😭 Something wrong when create wallet 😭`)
    }
}

export const depositWallet = (amount) => async (dispatch, getState) => {
    try {
        const { signer, contractWallet, provider } = getState().Web3Reducer
        const { _id } = getState().WalletReducer
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