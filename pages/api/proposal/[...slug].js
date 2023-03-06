import { getAllProposalOfWallet, voteProposal } from '@/backend/controllers/Proposal'
import connectDB from '@/backend/db/connect'
import catchAsync from '@/backend/middlewares/CatchAsync'
import { NotAllowedError } from '@/backend/errors'

connectDB()
const handler = async (req, res) => {
    switch (req.method) {
        case "GET": {
            await getAllProposalOfWallet(req, res)
            break
        }
        case "PATCH": {
            await voteProposal(req, res)
            break
        }
        default: {
            throw new NotAllowedError(`Unsupport method ${req.method}`)
        }
    }
}

export default catchAsync(handler)