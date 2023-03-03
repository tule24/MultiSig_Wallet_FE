import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import { updateWeb3 } from '../slices/Web3Slice'
import { createUser, resetUserVote } from '../thunk/UserAction'
import { MultiSigFactoryABI, MultiSigWalletABI } from '../contracts'
import { fetchContract, weiToEth } from '../utils'
import { resetIdInfo } from './ProposalAction'
import { resetWalletInfo } from './WalletAction'
import { walletServices } from '../services'
import { StatusCodes } from 'http-status-codes'
import { updateWallet } from '../slices/WalletSlice'

export const handleAccountChange = (accounts) => async (dispatch) => {
    if (accounts.length) {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
        const contractFactory = fetchContract(process.env.NEXT_PUBLIC_WALLET_FACTORY_ADDRESS, MultiSigFactoryABI, signer)
        dispatch(updateWeb3({ contractFactory, signer, provider }))
        dispatch(createUser(accounts[0]))
        dispatch(resetIdInfo())
        dispatch(resetWalletInfo())
        dispatch(resetUserVote())
    } else {
        console.log("No account found")
    }
}

export const checkWalletConnected = () => async (dispatch) => {
    try {
        if (!window.ethereum) return console.log("Please install MetaMask")
        const accounts = await window.ethereum.request({
            method: "eth_accounts",
        })
        dispatch(handleAccountChange(accounts))
    } catch (error) {
        console.log("Something wrong while connecting to wallet", error)
    }
}

export const connectWallet = () => async (dispatch) => {
    try {
        if (!window.ethereum) return console.log("Please install MetaMask")
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        })
        dispatch(handleAccountChange(accounts))
    } catch (error) {
        console.log("Something wrong while connecting to wallet", error)
    }
}

export const setContractWallet = (address) => async (dispatch, getState) => {
    try {
        const { signer } = getState().Web3Reducer
        const contractWallet = fetchContract(address, MultiSigWalletABI, signer)
        contractWallet.on('Deposit', () => dispatch(updateBalance()))
        dispatch(updateWeb3({ contractWallet }))
    } catch (error) {
        console.log("Something wrong while fetch contract wallet", error)
    }
}

export const updateBalance = () => async (dispatch, getState) => {
    try {
        const { contractWallet, provider } = getState().Web3Reducer
        let balance = await provider.getBalance(contractWallet.address)
        balance = weiToEth(balance) * 1
        const { wallet } = getState().WalletReducer
        const { data, status } = await walletServices.updateWallet(wallet._id, { balance })
        if (status === StatusCodes.OK) {
            dispatch(updateWallet(data.data))
        } else {
            console.log(data)
        }
    } catch (error) {
        console.log(error)
    }
}
