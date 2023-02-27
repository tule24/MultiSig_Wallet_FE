import React from 'react'
import Image from 'next/image'
import { useSelector } from 'react-redux'

// INTERNAL IMPORT
const Loader = () => {
    const { loading } = useSelector(state => state.LoaderReducer)
    return (
        loading && (<div className='fixed top-0 left-0 right-0 z-[100] h-screen flex flex-col items-center justify-center text-center bg-white bg-opacity-80'>
            <h2 className='text-black m-5 text-2xl font-semibold'>⚠️ Please wait a moment. ⚠️<br /> The transaction must wait for the network confirmation.</h2>
            <Image src={'/giphy.gif'} alt="loader" width={200} height={200}/>
        </div>)
    )
}

export default Loader