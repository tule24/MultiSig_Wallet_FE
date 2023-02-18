import { createWallet, getAllWallet } from '@/backend/controllers/Wallet'
import connectDB from '@/backend/db/connect'
import catchAsync from '@/backend/middlewares/CatchAsync'
import { ForbiddenError } from '@/backend/errors'

connectDB()
const handler = async (req, res) => {
    switch (req.method) {
        case "POST": {
            await createWallet(req, res)
            break
        }
        case "GET": {
            await getAllWallet(req, res)
            break
        }
        default: {
            throw new ForbiddenError(`Unsupport method ${req.method}`)
        }
    }
}

export default catchAsync(handler)