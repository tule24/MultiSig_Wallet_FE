import React from 'react'
import { BsFillCaretDownFill } from 'react-icons/bs'
import { FcAlarmClock, FcBookmark, FcKey } from 'react-icons/fc'
import { useDispatch, useSelector } from 'react-redux'
import { voteID } from '@/redux/thunk/ProposalAction'

const IdAccordian = ({ title, ids }) => {
    const { user } = useSelector(state => state.UserReducer)
    const dispatch = useDispatch()
    return (
        <div className='w-full py-20 mt-10'>
            <div className='relative w-full overflow-hidden'>
                <div className='w-full p-4 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'>
                    <h1 className='text-3xl font-bold tracking-wide text-violet-500 text-center'>{title}</h1>
                </div>
            </div>
            {ids.map((ele, i) => {
                return ele.type === 'transaction' ? (
                    <div className='relative w-full overflow-hidden' key={i}>
                        <input type="checkbox" className='peer absolute top-0 inset-x-0 opacity-0 z-10 w-[100px] h-full left-full -translate-x-[100px] cursor-pointer' />
                        <div className='w-full flex p-4 font-medium text-left text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'>
                            <h1 className='text-lg font-semibold dark:text-white ml-5 flex items-center'>
                                <FcBookmark size={20} className='mr-[3px]' />#{ele.contractId}
                            </h1>
                            <h1 className='text-lg font-semibold dark:text-white mx-20 flex items-center'>
                                <FcKey size={20} className='mr-[3px]' />Transaction
                            </h1>
                            <h1 className='text-lg font-semibold dark:text-white flex items-center mr-20'>
                                <FcAlarmClock size={20} className='mr-[3px]' />{ele.createdAt}
                            </h1>
                            {title === 'ID PENDING' && (
                                !ele.votes.find(ele => ele.voter === user.address) && (
                                <>
                                    <button type='button' onClick={() => dispatch(voteID(ele, true))} className="z-10 px-3 py-1 font-semibold rounded dark:bg-green-700 dark:text-white dark:hover:bg-green-500 dark:hover:text-gray-800 mr-2">Accept</button>
                                    <button type='button' onClick={() => dispatch(voteID(ele, false))} className="z-10 px-3 py-1 font-semibold rounded dark:bg-red-700 dark:text-white dark:hover:bg-red-500 dark:hover:text-gray-800">Reject</button>
                                </>
                                )
                            )}
                            {title === 'ID HISTORY' && (
                                ele.state === 'success' ? (
                                    <button className="z-10 px-3 py-1 font-semibold rounded dark:bg-green-700 dark:text-white dark:hover:bg-green-500 dark:hover:text-gray-800">Success</button>
                                ) : (
                                    <button className="z-10 px-3 py-1 font-semibold rounded dark:bg-red-700 dark:text-white dark:hover:bg-red-500 dark:hover:text-gray-800">Fail</button>
                                )
                            )}
                        </div>
                        <div className='absolute top-7 right-10 text-white transition-transform duration-500 rotate-0 peer-checked:rotate-180'>
                            <BsFillCaretDownFill />
                        </div>
                        <div className='font-light border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900 overflow-hidden transition-all duration-500 max-h-0 peer-checked:max-h-40'>
                            <div className='py-5 px-10 flex justify-between'>
                                <div>
                                    <p className='mb-1'><span className='text-gray-500 font-semibold'>To: </span><span className='tracking-wide'>{ele.to}</span></p>
                                    <p className='mb-1'><span className='text-gray-500 font-semibold'>Amount: </span><span>{ele.amount} ETH (100$)</span></p>
                                    <p className='mb-1'><span className='text-gray-500 font-semibold'>Creator: </span><span>{ele.creator}</span></p>
                                </div>
                                <div className='flex justify-evenly'>
                                    <div className='flex flex-col text-center'>
                                        <div title='total approval' className='mb-1 w-[50px] h-[50px] flex justify-center items-center font-semibold text-2xl border rounded-full border-white bg-green-500 bg-opacity-30'>{ele.accept}</div>
                                        <p className='text-xl'>👍</p>
                                    </div>
                                    <div className='flex flex-col text-center'>
                                        <div title='total reject' className='mb-1 w-[50px] h-[50px] flex justify-center items-center font-semibold text-2xl mx-10 border rounded-full border-white bg-red-500 bg-opacity-30'>{ele.reject}</div>
                                        <p className='text-xl'>👎</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='relative w-full overflow-hidden' key={i}>
                        <input type="checkbox" className='peer absolute top-0 inset-x-0 opacity-0 z-10 w-[100px] h-full left-full -translate-x-[100px] cursor-pointer' />
                        <div className='w-full flex p-4 font-medium text-left text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'>
                            <h1 className='text-lg font-semibold dark:text-white ml-5 flex items-center'>
                                <FcBookmark size={20} className='mr-[3px]' />#{ele.contractId}
                            </h1>
                            <h1 className='text-lg font-semibold dark:text-white mx-20 flex items-center'>
                                <FcKey size={20} className='mr-[3px]' />Consensus
                            </h1>
                            <h1 className='text-lg font-semibold dark:text-white flex items-center mr-20'>
                                <FcAlarmClock size={20} className='mr-[3px]' />{ele.createdAt}
                            </h1>
                            {title === 'ID PENDING' && (
                                !ele.votes.find(ele => ele.voter === user.address) && (
                                    <>
                                        <button type='button' onClick={() => dispatch(voteID(ele, true))} className="z-10 px-3 py-1 font-semibold rounded dark:bg-green-700 dark:text-white dark:hover:bg-green-500 dark:hover:text-gray-800 mr-2">Accept</button>
                                        <button type='button' onClick={() => dispatch(voteID(ele, false))} className="z-10 px-3 py-1 font-semibold rounded dark:bg-red-700 dark:text-white dark:hover:bg-red-500 dark:hover:text-gray-800">Reject</button>
                                    </>
                                )
                            )}
                            {title === 'ID HISTORY' && (
                                ele.state === 'success' ? (
                                    <button className="z-10 px-3 py-1 font-semibold rounded dark:bg-green-700 dark:text-white dark:hover:bg-green-500 dark:hover:text-gray-800">Success</button>
                                ) : (
                                    <button className="z-10 px-3 py-1 font-semibold rounded dark:bg-red-700 dark:text-white dark:hover:bg-red-500 dark:hover:text-gray-800">Fail</button>
                                )
                            )}
                        </div>
                        <div className='absolute top-7 right-10 text-white transition-transform duration-500 rotate-0 peer-checked:rotate-180'>
                            <BsFillCaretDownFill />
                        </div>
                        <div className='font-light border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900 overflow-hidden transition-all duration-500 max-h-0 peer-checked:max-h-96'>
                            <div className='py-5 px-10 flex justify-between'>
                                <div>
                                    <p className='mb-1'><span className='text-gray-500 font-semibold'>Owners add: </span></p>
                                    <ul className='list-disc ml-10 text-green-500'>
                                        {ele.addOwners.map((address, index) => {
                                            return (
                                                <li key={address}><span className='mr-2'>Address {index + 1}:</span><span className='tracking-wide text-white'>{address}</span> </li>
                                            )
                                        })}
                                    </ul>
                                    <p className='mb-1'><span className='text-gray-500 font-semibold'>Owners remove: </span></p>
                                    <ul className='list-disc ml-10 text-red-500'>
                                        {ele.delOwners.map((address, index) => {
                                            return (
                                                <li key={address}><span className='mr-2'>Address {index + 1}:</span><span className='tracking-wide text-white'>{address}</span> </li>
                                            )
                                        })}
                                    </ul>
                                    <p className='mb-1'><span className='text-gray-500 font-semibold'>Approval required: </span><span>{ele.approvalRequired}</span></p>
                                    <p className='mb-1'><span className='text-gray-500 font-semibold'>Creator: </span><span>{ele.creator}</span></p>
                                </div>
                                <div className='flex justify-evenly'>
                                    <div className='flex flex-col text-center'>
                                        <div title='total approval' className='mb-1 w-[50px] h-[50px] flex justify-center items-center font-semibold text-2xl border rounded-full border-white bg-green-500 bg-opacity-30'>{ele.accept}</div>
                                        <p className='text-xl'>👍</p>
                                    </div>
                                    <div className='flex flex-col text-center'>
                                        <div title='total reject' className='mb-1 w-[50px] h-[50px] flex justify-center items-center font-semibold text-2xl mx-10 border rounded-full border-white bg-red-500 bg-opacity-30'>{ele.reject}</div>
                                        <p className='text-xl'>👎</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default IdAccordian