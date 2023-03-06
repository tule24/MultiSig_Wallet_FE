import { createUser, getAllUser, updateMultipleUser } from '@/backend/controllers/User'
import connectDB from '@/backend/db/connect'
import catchAsync from '@/backend/middlewares/CatchAsync'
import { NotAllowedError } from '@/backend/errors'

connectDB()
const handler = async (req, res) => {
    switch (req.method) {
        case "POST": {
            await createUser(req, res)
            break
        }
        case "GET": {
            await getAllUser(req, res)
            break
        }
        case "PATCH": {
            await updateMultipleUser(req, res)
            break
        }
        default: {
            throw new NotAllowedError(`Unsupport method ${req.method}`)
        }
    }
}

export default catchAsync(handler)