import { createProposal, getAllProposal } from '@/backend/controllers/Proposal'
import connectDB from '@/backend/db/connect'
import catchAsync from '@/backend/middlewares/CatchAsync'
import { ForbiddenError } from '@/backend/errors'

connectDB()
const handler = async (req, res) => {
    switch (req.method) {
        case "POST": {
            await createProposal(req, res)
            break
        }
        case "GET": {
            await getAllProposal(req, res)
            break
        }
        default: {
            throw new ForbiddenError(`Unsupport method ${req.method}`)
        }
    }
}

export default catchAsync(handler)