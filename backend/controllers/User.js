import User from '@/backend/models/User'
import { StatusCodes } from 'http-status-codes'
import { NotFoundError } from '../errors'

const createUser = async (req, res) => {
    const { address } = req.body
    if (!address) {
        res.status(StatusCodes.BAD_REQUEST).send("Please provide wallet address")
    } else {
        const user = await User.findOne({ address })
        if (user) {
            res.status(StatusCodes.OK).json({
                status: "Success",
                message: "User exist",
                data: user
            })
        } else {
            const newUser = await User.create(req.body)
            res.status(StatusCodes.CREATED).json({
                status: "Success",
                message: "New User",
                data: newUser
            })
        }
    }
}

const updateUser = async (req, res) => {
    const { userID } = req.query
    const { address } = req.body
    if (address) {
        res.status(StatusCodes.BAD_REQUEST).send("address is immutable")
    } else {
        const user = await User.findByIdAndUpdate(userID, req.body, { new: true, runValidators: true })
        if (!user) {
            throw new NotFoundError(`Not found user with id ${userID}`)
        } else {
            res.status(StatusCodes.OK).json({
                status: "Success",
                data: user
            })
        }
    }
}

const deleteUser = async (req, res) => {
    const { userID } = req.query
    const user = await User.findByIdAndDelete(userID)
    if (!user) {
        throw new NotFoundError(`Not found user with id ${userID}`)
    } else {
        res.status(StatusCodes.OK).json({
            status: "Success",
            data: user
        })
    }
}

const getAllUser = async (req, res) => {
    const users = await User.find()
    res.status(StatusCodes.OK).json({
        status: "success",
        total: users.length,
        data: users
    })
}
const getUser = async (req, res) => {
    const { userID } = req.query
    const user = await User.findById(userID)
    if (!user) {
        throw new NotFoundError(`Not found user with id ${userID}`)
    } else {
        res.status(StatusCodes.OK).json({
            status: "success",
            data: user
        })
    }
}


export { createUser, updateUser, deleteUser, getAllUser, getUser }

