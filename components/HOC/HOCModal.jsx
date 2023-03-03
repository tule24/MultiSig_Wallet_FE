import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '@/redux/slices/ModalSlice'
import { AiOutlineClose } from 'react-icons/ai'
const HOCModal = () => {
    const { component, open, type } = useSelector(state => state.ModalReducer)
    const dispatch = useDispatch()
    return open && (
        <div className=' fixed top-0 left-0 right-0 h-screen flex justify-center items-center bg-black bg-opacity-50 z-50 text-white'>
            <div className='flex flex-col w-1/3 rounded-lg overflow-hidden'>
                <div className='grid grid-cols-[6fr_1fr] bg-violet-800'>
                    <h3 className='p-3 text-center text-lg tracking-wide font-semibold'>{type}</h3>
                    <button
                        className='flex justify-center items-center bg-violet-900 p-2 border-none border-l border-l-white outline-none cursor-pointer transition-all duration-200 hover:bg-violet-400'
                        onClick={() => dispatch(closeModal())}>
                        <AiOutlineClose size={20} />
                    </button>
                </div>
                <div className='p-5 w-full bg-gray-900'>
                    {component}
                </div>
            </div>
        </div>
    )
}

export default HOCModal