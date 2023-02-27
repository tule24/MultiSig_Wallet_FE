import Wallet from "../models/Wallet"
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, NotFoundError } from '../errors'

const createWallet = async (req, res) => {
    const { address, owners, approvalsRequired } = req.body
    if (!address || !owners || !approvalsRequired) {
        res.status(StatusCodes.BAD_REQUEST).send("Please provide address, owners & approval required")
    } else {
        const wallet = await Wallet.create(req.body)
        res.status(StatusCodes.CREATED).json({
            status: "Success",
            data: wallet
        })
    }
}

const updateWallet = async (req, res) => {
    const { slug } = req.query
    const walletId = slug[0]
    const { address } = req.body
    if (address) {
        res.status(StatusCodes.BAD_REQUEST).send("address is immutable")
    } else {
        if (Object.values(req.body).includes(null)) {
            throw new BadRequestError("Not update null value")
        }
        const wallet = await Wallet.findByIdAndUpdate(walletId, req.body, { new: true })
        if (!wallet) {
            throw new NotFoundError(`Not found wallet with id ${walletId}`)
        } else {
            res.status(StatusCodes.OK).json({
                status: "Success",
                data: wallet
            })
        }
    }
}

const getAllWallet = async (req, res) => {
    const wallets = await Wallet.find()
    res.status(StatusCodes.OK).json({
        status: "Success",
        total: wallets.length,
        data: wallets
    })
}

const getWallet = async (req, res) => {
    const { slug } = req.query
    const field = slug[0]
    const value = slug[1]

    const wallet = await Wallet.find({ [field]: value })
    if (!wallet) {
        throw new NotFoundError(`Not found wallet with at ${field} ${value}`)
    } else {
        res.status(StatusCodes.OK).json({
            status: "Success",
            data: wallet
        })
    }
}

const deleteWallet = async (req, res) => {
    const { walletID } = req.query
    const wallet = await Wallet.findByIdAndDelete(walletID)
    if (!wallet) {
        throw new NotFoundError(`Not found user with id ${walletID}`)
    } else {
        res.status(StatusCodes.OK).json({
            status: "Success",
            data: wallet
        })
    }
}

export { createWallet, updateWallet, getAllWallet, getWallet, deleteWallet }