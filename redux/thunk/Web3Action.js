import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import { updateWeb3 } from '../slices/Web3Slice'
import { createUser } from '../thunk/UserAction'
import { MultiSigFactoryABI, MultiSigWalletABI } from '../contracts'
import { fetchContract } from '../utils'
import { resetIdInfo } from './ProposalAction'
import { resetWalletInfo } from './WalletAction'

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
        dispatch(updateWeb3({ contractWallet }))
    } catch (error) {
        console.log("Something wrong while fetch contract wallet", error)
    }
}

