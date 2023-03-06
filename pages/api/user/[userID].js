import { getUser, deleteUser, updateUser } from '@/backend/controllers/User'
import connectDB from '@/backend/db/connect'
import catchAsync from '@/backend/middlewares/CatchAsync'
import { NotAllowedError } from '@/backend/errors'

connectDB()
const handler = async (req, res) => {
    switch (req.method) {
        case "GET": {
            await getUser(req, res)
            break
        }
        case "PATCH": {
            await updateUser(req, res)
            break
        }
        case "DELETE": {
            await deleteUser(req, res)
            break
        }
        default: {
            throw new NotAllowedError(`Unsupport method ${req.method}`)
        }
    }
}

export default catchAsync(handler)