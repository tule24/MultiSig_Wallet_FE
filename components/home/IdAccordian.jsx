import React from 'react'
import { BsFillCaretDownFill } from 'react-icons/bs'
import { FcAlarmClock, FcBookmark, FcKey } from 'react-icons/fc'

const IdAccordian = ({title}) => {
    return (
        <div className='w-full py-20 mt-10'>
            <div className='relative w-full overflow-hidden'>
                <div className='w-full p-4 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'>
                    <h1 className='text-3xl font-bold tracking-wide text-violet-500 text-center'>{title}</h1>
                </div>
            </div>
            <div className='relative w-full overflow-hidden'>
                <input type="checkbox" className='peer absolute top-0 inset-x-0 opacity-0 z-10 w-[100px] h-full left-full -translate-x-[100px] cursor-pointer' />
                <div className='w-full flex p-4 font-medium text-left text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'>
                    <h1 className='text-lg font-semibold dark:text-white ml-5 flex items-center'>
                        <FcBookmark size={20} className='mr-[3px]' />#1
                    </h1>
                    <h1 className='text-lg font-semibold dark:text-white mx-20 flex items-center'>
                        <FcKey size={20} className='mr-[3px]' />Transaction
                    </h1>
                    <h1 className='text-lg font-semibold dark:text-white flex items-center mr-20'>
                        <FcAlarmClock size={20} className='mr-[3px]' />11h:22p:30s 26/12/2022
                    </h1>
                    <button type="button" className="z-10 px-3 py-1 font-semibold rounded dark:bg-violet-700 dark:text-white dark:hover:bg-violet-500 dark:hover:text-gray-800">Vote</button>
                </div>
                <div className='absolute top-7 right-10 text-white transition-transform duration-500 rotate-0 peer-checked:rotate-180'>
                    <BsFillCaretDownFill />
                </div>
                <div className='font-light border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900 overflow-hidden transition-all duration-500 max-h-0 peer-checked:max-h-40'>
                    <div className='py-5 px-10 flex justify-between'>
                        <div>
                            <p className='mb-1'><span className='text-gray-500 font-semibold'>To: </span><span className='tracking-wide'>0x1BfC7c4Bce1DB93Ea3F48BFC52A6a7fccc770D3B</span></p>
                            <p className='mb-1'><span className='text-gray-500 font-semibold'>Amount: </span><span>10 ETH (100$)</span></p>
                            <p className='mb-1'><span className='text-gray-500 font-semibold'>Creator: </span><span>Owner 1</span></p>
                        </div>
                        <div className='flex justify-evenly'>
                            <div className='flex flex-col text-center'>
                                <div title='total approval' className='mb-1 w-[50px] h-[50px] flex justify-center items-center font-semibold text-2xl border rounded-full border-white bg-green-500 bg-opacity-30'>2</div>
                                <p className='text-xl'>👍</p>
                            </div>
                            <div className='flex flex-col text-center'>
                                <div title='total reject' className='mb-1 w-[50px] h-[50px] flex justify-center items-center font-semibold text-2xl mx-10 border rounded-full border-white bg-red-500 bg-opacity-30'>3</div>
                                <p className='text-xl'>👎</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='relative w-full overflow-hidden'>
                <input type="checkbox" className='peer absolute top-0 inset-x-0 opacity-0 z-10 w-[100px] h-full left-full -translate-x-[100px] cursor-pointer' />
                <div className='w-full flex p-4 font-medium text-left text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'>
                    <h1 className='text-lg font-semibold dark:text-white ml-5 flex items-center'>
                        <FcBookmark size={20} className='mr-[3px]' />#2
                    </h1>
                    <h1 className='text-lg font-semibold dark:text-white mx-20 flex items-center'>
                        <FcKey size={20} className='mr-[3px]' />Consensus
                    </h1>
                    <h1 className='text-lg font-semibold dark:text-white flex items-center'>
                        <FcAlarmClock size={20} className='mr-[3px]' />11h:22p:30s 26/12/2022
                    </h1>
                </div>
                <div className='absolute top-7 right-10 text-white transition-transform duration-500 rotate-0 peer-checked:rotate-180'>
                    <BsFillCaretDownFill />
                </div>
                <div className='font-light border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900 overflow-hidden transition-all duration-500 max-h-0 peer-checked:max-h-96'>
                    <div className='py-5 px-10 flex justify-between'>
                        <div>
                            <p className='mb-1'><span className='text-gray-500 font-semibold'>Owners add: </span></p>
                            <ul className='list-disc ml-10 text-green-500'>
                                <li><span className='mr-2'>Address 1:</span><span className='tracking-wide text-white'>0x1BfC7c4Bce1DB93Ea3F48BFC52A6a7fccc770D3B</span> </li>
                                <li><span className='mr-2'>Address 2:</span><span className='tracking-wide text-white'>0x1BfC7c4Bce1DB93Ea3F48BFC52A6a7fccc770D3B</span> </li>
                                <li><span className='mr-2'>Address 3:</span><span className='tracking-wide text-white'>0x1BfC7c4Bce1DB93Ea3F48BFC52A6a7fccc770D3B</span> </li>
                            </ul>
                            <p className='mb-1'><span className='text-gray-500 font-semibold'>Owners remove: </span></p>
                            <ul className='list-disc ml-10 text-red-500'>
                                <li><span className='mr-2'>Address 1:</span><span className='tracking-wide text-white'>0x1BfC7c4Bce1DB93Ea3F48BFC52A6a7fccc770D3B</span> </li>
                                <li><span className='mr-2'>Address 2:</span><span className='tracking-wide text-white'>0x1BfC7c4Bce1DB93Ea3F48BFC52A6a7fccc770D3B</span> </li>
                                <li><span className='mr-2'>Address 3:</span><span className='tracking-wide text-white'>0x1BfC7c4Bce1DB93Ea3F48BFC52A6a7fccc770D3B</span> </li>
                            </ul>
                            <p className='mb-1'><span className='text-gray-500 font-semibold'>Approval required: </span><span>3</span></p>
                            <p className='mb-1'><span className='text-gray-500 font-semibold'>Creator: </span><span>Owner 1</span></p>
                        </div>
                        <div className='flex justify-evenly'>
                            <div className='flex flex-col text-center'>
                                <div title='total approval' className='mb-1 w-[50px] h-[50px] flex justify-center items-center font-semibold text-2xl border rounded-full border-white bg-green-500 bg-opacity-30'>2</div>
                                <p className='text-xl'>👍</p>
                            </div>
                            <div className='flex flex-col text-center'>
                                <div title='total reject' className='mb-1 w-[50px] h-[50px] flex justify-center items-center font-semibold text-2xl mx-10 border rounded-full border-white bg-red-500 bg-opacity-30'>3</div>
                                <p className='text-xl'>👎</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IdAccordian