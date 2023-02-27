import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { FaGoogleWallet } from 'react-icons/fa'
import { CgKey } from 'react-icons/cg'
import { TfiWallet } from 'react-icons/tfi'
import { useTheme } from 'next-themes'
import { useDispatch, useSelector } from 'react-redux'
import { connectWallet, checkWalletConnected, handleAccountChange } from '@/redux/thunk/Web3Action'
import { depositWallet } from '@/redux/thunk/WalletAction'
import { addWallet } from '@/redux/thunk/UserAction'
import { minifyAddress } from '@/helpers'
import { ModalID, WalletDropdown } from './index'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import Loader from './Loader'
import { weiToEth } from '@/redux/utils'

const Navbar = () => {
    const { theme, setTheme } = useTheme()
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.UserReducer)
    const { contractWallet, provider } = useSelector(state => state.Web3Reducer)
    const [openModal, setOpenModal] = useState(false)
    const [type, setType] = useState('')
    const handleDeposit = (amount) => dispatch(depositWallet(amount))
    const handleAddWallet = (address) => dispatch(addWallet(address))
    const handleClick = (input) => {
        if (input === 'deposit') {
            setType('deposit')
        } else {
            setType('addWallet')
        }
        setOpenModal(true)
    }
    useEffect(() => {
        dispatch(checkWalletConnected())
        // window.ethereum.on('accountsChanged', (accounts) => dispatch(handleAccountChange(accounts)))
    }, [])

    const test = async () => {
        let balance = await provider.getBalance(contractWallet.address)
        return balance
    }
    return (
        <header className="px-10 py-4 bg-violet-500 fixed right-0 left-0 z-50">
            <div className="container flex justify-between items-center h-16 mx-auto">
                <div className='flex items-center'>
                    <Link href={{ pathname: '/' }} className="flex justify-center items-center mr-10">
                        <p className='flex items-center font-semibold text-3xl relative'>
                            <FaGoogleWallet size={60} color="black" />
                            <span className='mr-2'>allet</span>
                            <CgKey size={50} color="black" className='icon' />
                        </p>
                    </Link>
                    <WalletDropdown />
                    {/* <button onClick={() => { test().then(res => console.log(Number(res))) }}>Test</button> */}
                </div>
                <ul className="items-stretch hidden space-x-3 md:flex">
                    <Link href={{ pathname: '/stats' }} className="flex items-center mr-10">
                        <p className="mr-5 hover:text-gray-900 font-semibold text-xl">Stats</p>
                    </Link>
                    <Link href={{ pathname: '/create' }} className="flex items-center mr-10">
                        <p className="mr-5 hover:text-gray-900 font-semibold text-xl">Create Wallet</p>
                    </Link>
                    <div className="flex items-center mr-10">
                        <button className='mr-5 hover:text-gray-900 font-semibold text-xl' onClick={() => handleClick('addWallet')}>
                            Add Wallet
                        </button>
                    </div>
                    <div className="flex items-center mr-10">
                        <button className='mr-5 hover:text-gray-900 font-semibold text-xl' onClick={() => handleClick('deposit')}>
                            Deposit
                        </button>
                    </div>
                    <button
                        className="inline-flex items-center border font-semibold py-2 px-3 focus:outline-none hover:bg-violet-800 rounded text-lg mt-4 md:mt-0"
                        onClick={() => { dispatch(connectWallet()) }}
                    >
                        <TfiWallet size={20} className="mr-2" />{user?.address ? minifyAddress(user.address, 3) : 'Connect'}
                    </button>
                    <label className="inline-flex relative items-center mr-5 cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={theme === 'light'}
                            readOnly
                        />
                        <div
                            onClick={() => {
                                theme == 'light' ? setTheme('dark') : setTheme('light')
                            }}
                            className="w-11 h-6 bg-gray-300 rounded-full peer peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-3 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-700"
                        ></div>
                    </label>
                </ul>
                <button className="flex justify-end p-4 md:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>
            {openModal && (
                type === 'deposit' ? <ModalID type='deposit' setOpenModal={setOpenModal} handleDispatch={handleDeposit} />
                    : <ModalID type='addWallet' setOpenModal={setOpenModal} handleDispatch={handleAddWallet} />
            )}
            <ToastContainer closeButton={true} theme={theme} position='top-center' style={{ width: "max-content" }} />
            <Loader />
        </header>
    )
}

export default Navbar