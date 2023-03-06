import React from 'react'
import CreateWallet from '@/components/create/CreateWallet'
import { NotConnect } from '@/components/home'
import { useSelector } from 'react-redux'
const Create = () => {
    const { signer } = useSelector(state => state.Web3Reducer)
    return (
        <div className='flex justify-center items-center flex-col pt-40 pb-10 bg-gray-200 text-black dark:bg-black dark:text-white'>
            {signer ? <CreateWallet /> : <NotConnect />}
        </div>
    )
}

export default Create