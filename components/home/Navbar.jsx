import React, { useContext } from 'react'
import Link from 'next/link'
import { FaGoogleWallet } from 'react-icons/fa'
import { CgKey } from 'react-icons/cg'
import { TfiWallet } from 'react-icons/tfi'
import { MSFactoryContext } from '@/Context/MSFactoryContext'
const Navbar = () => {
    const { theme, setTheme } = useContext(MSFactoryContext)
    return (
        <header className="px-10 py-4 bg-violet-500 fixed right-0 left-0">
            <div className="container flex justify-between items-center h-16 mx-auto">
                <Link href={{ pathname: '/' }} className="flex justify-center items-center">
                    <p className='flex items-center font-semibold text-3xl relative'>
                        <FaGoogleWallet size={60} color="black" />
                        <span className='mr-2'>allet</span>
                        <CgKey size={50} color="black" className='icon' />
                    </p>
                </Link>
                <ul className="items-stretch hidden space-x-3 md:flex">
                    <Link href={{ pathname: '/create' }} className="flex items-center mr-10">
                        <p className="mr-5 hover:text-gray-900 font-semibold text-xl">Create Wallet</p>
                    </Link>
                    <button className="inline-flex items-center border font-semibold py-2 px-3 focus:outline-none hover:bg-violet-800 rounded text-lg mt-4 md:mt-0"><TfiWallet size={20} className="mr-2" />Connect</button>
                    <label class="inline-flex relative items-center mr-5 cursor-pointer">
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
        </header>


    )
}

export default Navbar