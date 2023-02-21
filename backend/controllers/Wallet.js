import Wallet from "../models/Wallet"
import { StatusCodes } from 'http-status-codes'
import { NotFoundError } from '../errors'

const createWallet = async (req, res) => {
    const { address, owners, approvalRequired } = req.body
    if (!address || !owners || !approvalRequired) {
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
    const { walletID } = req.query
    const { address } = req.body
    if (address) {
        res.status(StatusCodes.BAD_REQUEST).send("address is immutable")
    } else {
        const wallet = await Wallet.findByIdAndUpdate(walletID, req.body, { new: true })
        if (!wallet) {
            throw new NotFoundError(`Not found wallet with id ${walletID}`)
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