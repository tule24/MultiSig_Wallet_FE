import React from 'react'
import FormCreate from '@/components/create/FormCreate'
const Create = () => {
    return (
        <div className='flex justify-center items-center flex-col pt-40'>
            <h1 className='text-3xl font-extrabold tracking-wider '>CREATE NEW WALLET</h1>
            <FormCreate />
        </div>
    )
}

export default Create