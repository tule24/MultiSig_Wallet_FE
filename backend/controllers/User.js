import User from '@/backend/models/User'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, NotFoundError } from '../errors'
import Proposal from '../models/Proposal'
import { Types } from "mongoose"

const createUser = async (req, res) => {
    const { address } = req.body
    if (!address) {
        res.status(StatusCodes.BAD_REQUEST).send("Please provide wallet address")
    } else {
        const newAddress = address.toLowerCase()
        const user = await User.findOne({ address: newAddress })
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

const updateMultipleUser = async (req, res) => {
    const { users, wallet } = req.body
    if (users.length < 1) {
        res.status(StatusCodes.BAD_REQUEST).send("Please provide users array")
    } else {
        const allUser = await User.find({})
        let newUsers = allUser.filter(user => users.includes(user.address)).map(user => {
            const wallets = user.wallets.filter(address => address !== wallet)
            return { userId: user._id, wallets }
        })
        let promiseUser = newUsers.map(async (user) => await User.findByIdAndUpdate(user.userId, { wallets: user.wallets }))

        await Promise.all(promiseUser)
            .then(() => res.status(StatusCodes.OK).json({ status: 'Success' }))
            .catch(e => res.status(StatusCodes.BAD_REQUEST).json({ status: 'Fail', data: e }))
    }
}

const updateUser = async (req, res) => {
    const { userID } = req.query
    const { address } = req.body
    if (address) {
        res.status(StatusCodes.BAD_REQUEST).send("address is immutable")
    } else {
        if (Object.values(req.body).includes(null)) {
            throw new BadRequestError("Not update null value")
        }
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

const getVoteOfUser = async (req, res) => {
    const { walletId } = req.query
    const stats = await Proposal.aggregate([
        {
            $match: { walletId: Types.ObjectId(walletId) }
        },
        {
            $unwind: "$votes"
        },
        {
            $group: {
                _id: "$votes",
                count: { $count: {} }
            }
        },
        {
            $addFields: {
                voter: "$_id.voter",
                vote: "$_id.vote"
            }
        },
        {
            $project: {
                _id: 0
            }
        }
    ])

    res.status(StatusCodes.OK).json({
        status: 'success',
        total: stats.length,
        data: stats
    })
}

export { createUser, updateUser, deleteUser, getAllUser, getUser, updateMultipleUser, getVoteOfUser }

