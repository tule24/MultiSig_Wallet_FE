import { getWallet, updateWallet, deleteWallet } from '@/backend/controllers/Wallet'
import connectDB from '@/backend/db/connect'
import catchAsync from '@/backend/middlewares/CatchAsync'
import { NotAllowedError } from '@/backend/errors'

connectDB()
const handler = async (req, res) => {
    switch (req.method) {
        case "GET": {
            await getWallet(req, res)
            break
        }
        case "PATCH": {
            await updateWallet(req, res)
            break
        }
        case "DELETE": {
            await deleteWallet(req, res)
            break
        }
        default: {
            throw new NotAllowedError(`Unsupport method ${req.method}`)
        }
    }
}

export default catchAsync(handler)