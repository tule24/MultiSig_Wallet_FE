import { proposalServices } from '../services'
import { updateProposal } from '../slices/ProposalSlice'
import { updateWallet } from '../slices/WalletSlice'
import { updateWalletThunk } from './WalletAction'
import { StatusCodes } from 'http-status-codes'
import { toast } from 'react-toastify'
import { strToEth } from '../utils'

export const createID = (type, dataObj) => async (dispatch, getState) => {
    try {
        // const { contractWallet, currentAccount } = getState().Web3Reducer
        const { wallet } = getState().WalletReducer
        const { user } = getState().UserReducer
        let transaction
        let proposalObj = {
            walletId: wallet._id,
            type,
            vote: {
                voter: '0x32f2fEFa54d1D46B7960e262c53bc95004b085e5',
                vote: true
            }
        }
        if (type === 'transaction') {
            const { to, amount } = dataObj
            // transaction = await contractWallet.createTrans(to, strToEth(amount.toString()))
            proposalObj = { ...proposalObj, to, amount: Number(amount) }
        } else {
            const { addOwners, delOwners, approvalRequired } = dataObj
            // transaction = await contractWallet.createCons(addOwners, delOwners, approvalRequired)
            proposalObj = { ...proposalObj, addOwners, delOwners, approvalRequired: Number(approvalRequired) }
        }

        // const receipt = await transaction.wait()
        // const { id, creator } = receipt.events[0].args
        const contractId = 1
        const creator = user._id
        proposalObj = { ...proposalObj, contractId, creator }

        const { data, status } = await proposalServices.createProposal(proposalObj)
        if (status === StatusCodes.CREATED) {
            dispatch(getAllID())
            dispatch(updateWallet(data.data.walletUpdate))
            toast.success(`😁 A new ID create successfully 😁`)
        } else {
            console.log(data)
        }
    } catch (err) {
        console.log(err)
        toast.error(`😭 Something wrong when create ID 😭`)
    }
}

export const voteID = (proposal, vote) => async (dispatch, getState) => {
    try {
        // const { contractWallet, currentAccount } = getState().Web3Reducer
        // const transaction = await contractWallet.vote(contractId, vote)
        // const receipt = await transaction.wait()
        // const { user } = getState().UserReducer
        // const voteObj = {
        //     voteResult: {
        //         voter: user.address,
        //         vote
        //     }
        // }

        // const { data, status } = await proposalServices.updateProposal(proposal._id, voteObj)
        // if (status === StatusCodes.OK) {
        //     dispatch(getAllID())
        //     toast.success(`😁 Vote to ID ${proposal.contractId} successfully 😁`)
        // } else {
        //     console.log(data)
        // }
        const args = {
            addOwners: proposal.addOwners,
            delOwners: proposal.delOwners,
            approvalRequired: 2,
            success: true
        }

        dispatch(updateWalletThunk(proposal.walletId, 'ResolveCons', args))
        // if (receipt.events.length > 1) {
        //     const { event, args } = receipt.events[1]
        //     dispatch(updateWalletThunk(proposal.walletId, event, args))
        // }
    } catch (error) {
        console.log(err)
        toast.error(`😭 Something wrong when vote ID 😭`)
    }
}

export const getAllID = () => async (dispatch) => {
    try {
        const { data, status } = await proposalServices.getAllProposal()
        if (status === StatusCodes.OK) {
            dispatch(updateProposal(data.data))
        }
    } catch (error) {
        console.log(err)
    }
}