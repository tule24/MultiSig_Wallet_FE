import React, { useState } from 'react'
import { AiOutlineDollarCircle } from 'react-icons/ai'
import { TbUserCircle } from 'react-icons/tb'
import { ModalID } from './index'
import { useDispatch } from 'react-redux'
import { createID } from '@/redux/thunk/ProposalAction'

const CreateID = () => {
    const dispatch = useDispatch()
    const [openModal, setOpenModal] = useState(false)
    const [type, setType] = useState('')
    const handleClick = (type) => {
        setType(type)
        setOpenModal(true)
    }
    return (
        <div className='mt-20'>
            <h1 className='text-4xl tracking-wide text-violet-500 text-center font-semibold'>CREATE NEW ID</h1>
            <div className='flex justify-evenly mt-10'>
                <button
                    type="button"
                    className="px-8 py-3 font-semibold rounded-full dark:bg-violet-600 dark:text-white dark:hover:text-black dark:hover:scale-110 transition-all duration-500"
                    onClick={() => handleClick('transaction')}
                >
                    Make a transaction <AiOutlineDollarCircle size={30} className='inline' />
                </button>
                <button
                    type="button"
                    className="px-8 py-3 font-semibold rounded-full dark:bg-violet-600 dark:text-white dark:hover:text-black dark:hover:scale-110 transition-all duration-500"
                    onClick={() => handleClick('consensus')}
                >
                    Change consensus <TbUserCircle size={30} className='inline' />
                </button>
            </div>
            {openModal && <ModalID type={type} setOpenModal={setOpenModal} handleDispatch={(data) => dispatch(createID(type, data))} />}
        </div>
    )
}

export default CreateID