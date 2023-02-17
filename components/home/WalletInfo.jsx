import React from 'react'
import { BiCopy } from 'react-icons/bi'
import { FaEthereum } from 'react-icons/fa'
import { PieChartStats } from '@/components/stats'
const data_1 = [
    { name: 'FREE', value: 8 },
    { name: 'LOCK', value: 2 },
]
const COLORS = ['#0088FE', '#FF4444'];

const WalletInfo = () => {
    return (
        <div className='w-full border-2 rounded-lg border-dashed dark:border-white p-5 flex justify-between'>
            <div>
                <h1 className='text-3xl font-bold tracking-widest text-violet-500 mb-5'>MultiSig Wallet</h1>
                <h1 className='text-xl flex mb-3'><span className='font-semibold text-gray-500'>Address:</span><span className='mx-2 tracking-wide'>0x1BfC7c4Bce1DB93Ea3F48BFC52A6a7fccc770D3B</span> <BiCopy size={20} className="cursor-pointer" onClick={() => navigator.clipboard.writeText('0x1BfC7c4Bce1DB93Ea3F48BFC52A6a7fccc770D3B')} /></h1>
                <h1 className='text-xl font-semibold text-gray-500'>List Owners </h1>
                <ul className='list-disc ml-10'>
                    <li><span className='mr-2'>Owner 1:</span><span className='tracking-wide'>0x1BfC7c4Bce1DB93Ea3F48BFC52A6a7fccc770D3B</span> </li>
                    <li><span className='mr-2'>Owner 2:</span><span className='tracking-wide'>0x1BfC7c4Bce1DB93Ea3F48BFC52A6a7fccc770D3B</span> </li>
                    <li><span className='mr-2'>Owner 3:</span><span className='tracking-wide'>0x1BfC7c4Bce1DB93Ea3F48BFC52A6a7fccc770D3B</span> </li>
                </ul>
                <h1 className='text-xl font-semibold mt-3 text-gray-500'>Consensus </h1>
                <div className='flex'>
                    <p><span>Total owner :</span> 3</p>
                    <p className='mx-10'><span>Approve required :</span> 2</p>
                </div>
                <h1 className='text-xl font-semibold mt-3 text-gray-500'>Stats </h1>
                <div className='flex items-center flex-wrap'>
                    <p><span>Total ID :</span> 6</p>
                    <p className='mx-8' title='Transaction ID'><span>TxID :</span> 4 🤑</p>
                    <p title='Consensus ID'><span>CsID :</span> 2 🤲</p>
                    <p className='flex items-center ml-8'><span className='text-green-500 mr-2'>Success: </span> 4 😄</p>
                    <p className='mx-8'><span className='text-red-500'>Failed :</span> 1 😭</p>
                    <p><span className='text-yellow-500'>Pending :</span> 1 😐</p>
                </div>
            </div>
            <div className='text-center flex flex-col justify-evenly -mr-10'>
                <div className='w-[450px] h-[200px] flex justify-center items-center'>
                    <PieChartStats data={data_1} colors={COLORS} />
                </div>
                <div>
                    <p className='text-2xl'><span className='text-base font-semibold'>BALANCE</span> : 10 ETH<FaEthereum size={15} className='inline ml-1' /></p>
                    <p className='text-2xl'><span className='text-base font-semibold'>USD</span> : 1000 $</p>
                </div>
            </div>
        </div>
    )
}

export default WalletInfo