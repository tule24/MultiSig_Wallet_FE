import { getVote } from '@/backend/controllers/Vote'
import connectDB from '@/backend/db/connect'
import catchAsync from '@/backend/middlewares/CatchAsync'
import { ForbiddenError } from '@/backend/errors'

connectDB()
const handler = async (req, res) => {
    switch (req.method) {
        case "GET": {
            await getVote(req, res)
            break
        }
        default: {
            throw new ForbiddenError(`Unsupport method ${req.method}`)
        }
    }
}

export default catchAsync(handler)