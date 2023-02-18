import { proposalServices } from '../services/ProposalServices'
import { getDataProposal } from '../slices/ProposalSlice'
import { StatusCodes } from 'http-status-codes'
import { toast } from 'react-toastify'

export const createProposal = (proposalObj) => async (dispatch) => {
    try {
        const { data, status } = await proposalServices.createProposal(proposalObj)
        if (status === StatusCodes.CREATED) {
            dispatch(getDataProposal(data.data))
            toast.success(`😁 A new ${proposalObj.type}ID create successfully 😁`)
        } else {
            console.log(data)
        }
    } catch (err) {
        console.log(err)
        toast.error(`😭 Something wrong when create wallet 😭`)
    }
}