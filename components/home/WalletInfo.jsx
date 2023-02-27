import React, { useState } from 'react'
import Image from 'next/image'
import { BiCopy } from 'react-icons/bi'
import { FaEthereum, FaUsers, FaLock, FaShieldAlt, FaRegClock } from 'react-icons/fa'
import { PieChartStats } from '@/components/stats'
import { useSelector } from 'react-redux'
import { eth2usd } from '@/helpers'
const COLORS = ['#0088FE', '#FF4444'];

const wallet = () => {
    const { wallet } = useSelector(state => state.WalletReducer)
    // const [usd, setUsd] = useState(0)
    // eth2usd(wallet?.balance).then(setUsd)
    const data = [
        { name: 'FREE', value: wallet?.balance - wallet?.balanceLock },
        { name: 'LOCK', value: wallet?.balanceLock }
    ]
    return (
        <div className='w-full border-2 rounded-lg border-dashed dark:border-white border-black p-5 flex justify-between'>
            {wallet?.address ? (
                <>
                    <div>
                        <h1 className='text-3xl font-bold tracking-widest text-violet-500 mb-5'>MultiSig Wallet</h1>
                        <h1 className='text-xl flex mb-3'><span className='font-semibold text-gray-500'>Address:</span><span className='mx-2 tracking-wide'>{wallet?.address}</span> <BiCopy size={20} className="cursor-pointer" onClick={() => navigator.clipboard.writeText(wallet?.address)} /></h1>
                        <h1 className='text-xl font-semibold text-gray-500'>List Owners </h1>
                        <ul className='list-disc ml-10'>
                            {wallet?.owners.map((address, i) => {
                                return <li key={i}><span className='mr-2 font-semibold'>Owner {i + 1}:</span><span className='tracking-wide'>{address}</span> </li>
                            })}
                        </ul>
                        <h1 className='text-xl font-semibold mt-3 text-gray-500'>Consensus </h1>
                        <div className='flex'>
                            <p><span>Total owner :</span> {wallet?.owners.length}</p>
                            <p className='mx-10'><span>Approval required :</span> {wallet?.approvalsRequired}</p>
                        </div>
                        <h1 className='text-xl font-semibold mt-3 text-gray-500'>Stats </h1>
                        <div className='flex items-center flex-wrap'>
                            <p><span>Total ID :</span> {wallet?.transactionId + wallet?.consensusId}</p>
                            <p className='mx-8' title='Transaction ID'><span>TxID :</span> {wallet?.transactionId} 🤑</p>
                            <p title='Consensus ID'><span>CsID :</span> {wallet?.consensusId} 🤲</p>
                            <p className='flex items-center ml-8'><span className='text-green-500 mr-2'>Success: </span> {wallet?.successId} 😄</p>
                            <p className='mx-8'><span className='text-red-500'>Failed :</span> {wallet?.failedId} 😭</p>
                            <p><span className='text-yellow-500'>Pending :</span> {wallet?.pendingId} 😐</p>
                        </div>
                        <p className='flex items-center mt-5 italic text-sm text-gray-600'><FaRegClock className='mr-2' /> Last updated: {new Date(wallet?.updatedAt).toLocaleString()}</p>
                    </div>
                    <div className='text-center flex flex-col justify-evenly -mr-10'>
                        <div className='w-[450px] h-[200px] flex justify-center items-center'>
                            <PieChartStats data={data} colors={COLORS} />
                        </div>
                        <div>
                            <p className='text-2xl'><span className='text-base font-semibold'>BALANCE</span> : {wallet?.balance} ETH<FaEthereum size={20} className='inline ml-1' /></p>
                            <p className='text-2xl'><span className='text-base font-semibold'>USD</span> : {100} $</p>
                        </div>
                    </div>
                </>)
                : (
                    <div className='flex justify-around w-full p-2'>
                        <div>
                            <h1 className='flex items-center mb-5 text-5xl text-violet-500 font-semibold hover:text-white'><FaUsers size={50} className='mr-2' /> Distribution </h1>
                            <h1 className='ml-16 flex items-center mb-5 text-5xl text-violet-500 font-semibold hover:text-white'><FaShieldAlt size={50} className='mr-2' /> Security </h1>
                            <h1 className='ml-32 flex items-center mb-5 text-5xl text-violet-500 font-semibold hover:text-white'><FaLock size={50} className='mr-2' /> Safety </h1>
                            <h2 className='font-semibold text-lg'>Create a new wallet and take advantage of its fantastic features</h2>
                        </div>
                        <div>
                            <Image src={'/wallet-2.png'} width={250} height={250} className='hover:rotate-45 transition-all duration-500' alt='wallet' />
                        </div>
                    </div>
                )}
        </div>
    )
}

export default wallet