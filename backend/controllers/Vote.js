import Vote from '@/backend/models/Vote'
import { StatusCodes } from 'http-status-codes'
import { NotFoundError } from '../errors'

const createVote = async (req, res) => {
    const { proposalId, voter, vote } = req.body
    if (!proposalId || !voter || !vote) {
        res.status(StatusCodes.BAD_REQUEST).send("Please provide proposalId, voter, vote")
    } else {
        const vote = await Vote.create(req.body)
        res.status(StatusCodes.CREATED).json({
            status: "Success",
            data: vote
        })
    }
}

const getAllVote = async (req, res) => {
    const Votes = await Vote.find()
    res.status(StatusCodes.OK).json({
        status: "success",
        total: Votes.length,
        data: Votes
    })
}
const getVote = async (req, res) => {
    const { voteID } = req.query
    const vote = await Proposal.findById(voteID)
    if (!vote) {
        throw new NotFoundError(`Not found vote with id ${voteID}`)
    } else {
        res.status(StatusCodes.OK).json({
            status: "success",
            data: vote
        })
    }
}


export { createVote, getAllVote, getVote }

