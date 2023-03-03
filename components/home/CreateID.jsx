import React, { useState } from 'react'
import { AiOutlineDollarCircle } from 'react-icons/ai'
import { TbUserCircle } from 'react-icons/tb'
import { useDispatch } from 'react-redux'
import { openModal } from '@/redux/slices/ModalSlice'
import { FormConsensusID, FormTransactionID } from '@/components/Form'


const CreateID = () => {
    const dispatch = useDispatch()
    // const [openModal, setOpenModal] = useState(false)
    const [type, setType] = useState('')
    const handleClick = (type) => {
        setType(type)
        // setOpenModal(true)
    }

    return (
        <div className='mt-20'>
            <h1 className='text-4xl tracking-wide text-violet-500 text-center font-semibold'>CREATE NEW ID</h1>
            <div className='flex justify-evenly mt-10'>
                <button
                    type="button"
                    className="px-8 py-3 font-semibold rounded-full bg-violet-600 text-white hover:text-black hover:scale-110 transition-all duration-500"
                    onClick={() => dispatch(openModal({ component: <FormTransactionID />, type: 'Create Transaction ID' }))}
                >
                    Make a transaction <AiOutlineDollarCircle size={30} className='inline' />
                </button>
                <button
                    type="button"
                    className="px-8 py-3 font-semibold rounded-full bg-violet-600 text-white hover:text-black hover:scale-110 transition-all duration-500"
                    onClick={() => dispatch(openModal({ component: <FormConsensusID />, type: 'Create Consensus ID' }))}
                >
                    Change consensus <TbUserCircle size={30} className='inline' />
                </button>
            </div>
            {/* {openModal && <ModalID type={type} setOpenModal={setOpenModal} handleDispatch={(data) => dispatch(createID(type, data))} />} */}
        </div>
    )
}

export default CreateID