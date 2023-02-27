import React, { useEffect, useState } from 'react'
import { MdAdd, MdClose } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { createWallet } from '@/redux/thunk/WalletAction'
import { toast } from 'react-toastify'
import WAValidator from "wallet-address-validator"

const FormCreate = () => {
  const [total, setTotal] = useState([])
  const [approvalsRequired, setApprovalsRequired] = useState(2)
  const { address } = useSelector(state => state.UserReducer.user)
  const dispatch = useDispatch()
  const handleInput = (i, value) => {
    total[i] = value.toLowerCase().trim()
    setTotal([...total])
  }
  const handleSubmit = () => {
    if (approvalsRequired <= total.length + 1) {
      const isAddress = total.every(address => WAValidator.validate(address, 'ETH', 'testnet'))
      if (isAddress) {
        total.unshift(address)
        const walletObj = {
          owners: total,
          approvalsRequired: Number(approvalsRequired)
        }
        dispatch(createWallet(walletObj))
      } else {
        toast.error(`Make sure all owner's address is valid`)
      }
    } else {
      toast.error(`Make sure minimum total owners >= 2 and approvals required <= total owners`)
    }
  }

  useEffect(() => {
    setTotal([])
    setApprovalsRequired(2)
  }, [])
  return (
    <div className='w-1/2'>
      <h1 className='text-3xl font-extrabold tracking-wider text-center my-10'>CREATE NEW WALLET</h1>
      <form className='flex flex-col justify-center items-center'>
        <div className="mb-6 w-full">
          <label className="block mb-2 text-md font-semibold text-gray-900 dark:text-white">Owner 1</label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={address}
            readOnly
          />
        </div>
        {total.map((el, i) => (
          <div className="mb-6 w-full" key={i}>
            <label className="block mb-2 text-md font-semibold text-gray-900 dark:text-white">Owner {i + 2}</label>
            <div className='flex items-center'>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder='Enter owner wallet'
                value={el}
                onChange={(e) => handleInput(i, e.target.value)}
                required
              />
              <button
                type="button"
                className="ml-2 w-8 h-8 flex justify-center items-center font-semibold border border-dashed rounded border-black dark:border-gray-100 dark:text-gray-100 hover:bg-violet-400 hover:bg-opacity-50"
                onClick={() => { total.splice(i, 1); setTotal([...total]) }}
              ><MdClose size={25} /></button>
            </div>
          </div>
        ))}
        <button
          type="button"
          className="w-14 h-14 flex justify-center items-center font-semibold border border-dashed rounded border-black dark:border-gray-100 dark:text-gray-100 hover:bg-violet-400 hover:bg-opacity-50"
          onClick={() => setTotal([...total, ""])}
        >
          <MdAdd size={25} />
        </button>
        <div className="my-6 w-full">
          <label className="block mb-2 text-md font-semibold text-gray-900 dark:text-white">Approval required</label>
          <input
            type='number'
            min={2}
            max={total.length + 1}
            defaultValue={approvalsRequired}
            className="w-1/4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setApprovalsRequired(e.target.value)}
            required
          />
        </div>
        <button type='button' onClick={() => handleSubmit()} className="mt-8 text-lg tracking-wide text-white bg-violet-700 hover:bg-violet-900 focus:ring-4 focus:outline-none focus:ring-violet-300 font-semibold rounded-lg sm:w-auto px-5 py-2.5 text-center dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800">
          Create Multisig Wallet
        </button>
      </form>
    </div>
  )
}

export default FormCreate