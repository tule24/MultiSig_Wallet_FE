import Proposal from '../models/Proposal'
import Wallet from '../models/Wallet'
import { StatusCodes } from 'http-status-codes'
import { NotFoundError } from '../errors'

const createProposal = async (req, res) => {
    const { walletId, contractId, type, creator } = req.body
    if (!walletId || !contractId || !type || !creator) {
        res.status(StatusCodes.BAD_REQUEST).send("Please provide contractId, wallet ID, proposal type & creator")
    } else {
        const proposal = await Proposal.create(req.body)
        const wallet = await Wallet.findById(walletId)
        const walletObj = { pendingId: wallet.pendingId + 1 }
        if (type === 'transaction') {
            const { amount } = req.body
            walletObj.transactionId = wallet.transactionId + 1
            walletObj.balanceLock = wallet.balanceLock + amount
        } else {
            walletObj.consensusId = wallet.consensusId + 1
        }
        const walletUpdate = await Wallet.findByIdAndUpdate(walletId, walletObj, { new: true, runValidators: true })
        res.status(StatusCodes.CREATED).json({
            status: "Success",
            data: {
                proposal,
                walletUpdate
            }
        })
    }
}

const voteProposal = async (req, res) => {
    const { slug } = req.query
    const proposalID = slug[0]
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

const getAllProposalOfWallet = async (req, res) => {
    const { slug } = req.query
    const walletID = slug[0]
    const proposals = await Proposal.find({ walletId: walletID })
    if (!proposals) {
        throw new NotFoundError(`Not found proposal with walletId ${walletID}`)
    } else {
        res.status(StatusCodes.OK).json({
            status: "success",
            data: proposals
        })
    }
}


export { createProposal, voteProposal, getAllProposal, getAllProposalOfWallet }

