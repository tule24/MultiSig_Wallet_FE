import { proposalServices } from '../services'
import { updateProposal } from '../slices/ProposalSlice'
import { StatusCodes } from 'http-status-codes'
import { toast } from 'react-toastify'
import { strToEth } from '../utils'

export const createID = (type, dataObj) => async (dispatch, getState) => {
    try {
        const { contractWallet, currentAccount } = getState().Web3Reducer
        const { _id } = getState().WalletReducer
        let transaction
        let proposalObj = {
            walletId: _id,
            type,
            vote: {
                voter: currentAccount,
                vote: true
            }
        }

        if (type === 'consensus') {
            const { to, amount } = dataObj
            transaction = await contractWallet.createTrans(to, strToEth(amount.toString()))
            proposalObj = { ...proposalObj, to, amount }
        } else {
            const { addOwners, delOwners, approvalRequired } = dataObj
            transaction = await contractWallet.createCons(addOwners, delOwners, approvalRequired)
            proposalObj = { ...proposalObj, addOwners, delOwners, approvalRequired }
        }

        const receipt = await transaction.wait()
        const { id, creator } = receipt.events[0].args
        proposalObj = { ...proposalObj, id, creator }

        const { data, status } = await proposalServices.createProposal(proposalObj)
        if (status === StatusCodes.CREATED) {
            dispatch(getAllID())
            toast.success(`😁 A new ID create successfully 😁`)
        } else {
            console.log(data)
        }
    } catch (err) {
        console.log(err)
        toast.error(`😭 Something wrong when create ID 😭`)
    }
}

export const voteID = (proposalId, contractId, vote) => async (dispatch, getState) => {
    try {
        const { contractWallet, currentAccount } = getState().Web3Reducer
        const transaction = await contractWallet.vote(contractId, vote)
        const receipt = await transaction.wait()

        let voteObj
        voteObj = {
            voteResult: {
                voter: currentAccount,
                vote
            }
        }

        if (receipt.events.length > 1) {
            const { event } = receipt.events[1]
            if (event === 'Success') {
                voteObj.state = 'success'
            } else {
                voteObj.state = 'fail'
            }
        }

        const { data, status } = await proposalServices.updateProposal(proposalId, voteObj)

        if (status === StatusCodes.OK) {
            dispatch(getAllID())
            toast.success(`😁 Vote to ID ${contractId} successfully 😁`)
        } else {
            console.log(data)
        }
    } catch (error) {
        console.log(err)
        toast.error(`😭 Something wrong when vote ID 😭`)
    }
}

export const getAllID = () => async (dispatch) => {
    try {
        const { data, status } = await proposalServices.getAllProposal()
        if (status === StatusCodes.OK) {
            dispatch(updateProposal(data))
        }
    } catch (error) {
        console.log(err)
    }
}