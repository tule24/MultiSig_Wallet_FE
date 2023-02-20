import Proposal from '@/backend/models/Proposal'
import { StatusCodes } from 'http-status-codes'
import { NotFoundError } from '../errors'

const createProposal = async (req, res) => {
    const { walletId, contractId, type, creator } = req.body
    if (!walletId || !contractId || !type || !creator) {
        res.status(StatusCodes.BAD_REQUEST).send("Please provide contractId, wallet ID, proposal type & creator")
    } else {
        const proposal = await Proposal.create(req.body)
        res.status(StatusCodes.CREATED).json({
            status: "Success",
            data: proposal
        })
    }
}

const voteProposal = async (req, res) => {
    const { proposalID } = req.query
    const { voteResult, state } = req.body
    const proposal = await Proposal.findById(proposalID)
    if (!proposal) {
        throw new NotFoundError(`Not found proposal with id ${proposalID}`)
    } else {
        let proposalObj
        let { votes, accept, reject } = proposal
        votes.push(voteResult)
        if (voteResult.vote) {
            accept += 1
        } else {
            reject += 1
        }

        proposalObj = { votes, accept, reject }
        if (state) {
            proposalObj.state = state
            proposalObj.finishAt = Date.now()
        }
        const newProposal = await Proposal.findByIdAndUpdate(proposalID, proposalObj, { new: true, runValidators: true })
        res.status(StatusCodes.OK).json({
            status: "Success",
            data: newProposal
        })
    }
}

const getAllProposal = async (req, res) => {
    const proposals = await Proposal.find()
    res.status(StatusCodes.OK).json({
        status: "success",
        total: proposals.length,
        data: proposals
    })
}
const getProposal = async (req, res) => {
    const { proposalID } = req.query
    const proposal = await Proposal.findById(proposalID)
    if (!proposal) {
        throw new NotFoundError(`Not found proposal with id ${proposalID}`)
    } else {
        res.status(StatusCodes.OK).json({
            status: "success",
            data: proposal
        })
    }
}


export { createProposal, voteProposal, getAllProposal, getProposal }

