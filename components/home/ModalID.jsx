import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { MdClose } from 'react-icons/md'

const ModalID = ({ type, setOpenModal, handleDispatch }) => {
  const [addOwners, setAddOwners] = useState([])
  const [delOwners, setDelOwners] = useState([])
  const [approvalRequired, setApprovalRequired] = useState(1)
  const handleInputAdd = (i, value) => {
    addOwners[i] = value.toLowerCase()
    setAddOwners([...addOwners])
  }
  const handleInputDel = (i, value) => {
    delOwners[i] = value.toLowerCase()
    setDelOwners([...delOwners])
  }

  const [transaction, setTransaction] = useState(null)
  const [amount, setAmount] = useState(0)

  const handleSubmit = () => {
    if (type === 'transaction') {
      handleDispatch(transaction)
    } else if (type === 'consensus') {
      handleDispatch({ addOwners, delOwners, approvalRequired })
    } else {
      handleDispatch(Number(amount))
    }
    setOpenModal(false)
  }
  return (
    <div className=' fixed top-0 left-0 right-0 h-screen flex justify-center items-center bg-gray-500 bg-opacity-60 z-50'>
      <div className='flex flex-col w-1/3 rounded-lg overflow-hidden'>
        <div className='grid grid-cols-[6fr_1fr] bg-violet-800'>
          <h3 className='p-3 text-center text-lg tracking-wide font-semibold'>{type === 'transaction' ? 'Create Transaction ID' : type === 'consensus' ? 'Create Consensus ID' : 'Deposit Wallet'}</h3>
          <button className='flex justify-center items-center bg-violet-900 p-2 border-none border-l border-l-white outline-none cursor-pointer transition-all duration-200 hover:bg-violet-400' onClick={() => setOpenModal(false)}><AiOutlineClose size={20} /></button>
        </div>
        <div className='p-5 w-full bg-gray-900'>
          {type === 'transaction' ? (
            <>
              <div>
                <label htmlFor="to" className="block font-semibold mb-1">Receiver</label>
                <input onBlur={(e) => setTransaction({ ...transaction, [e.target.name]: e.target.value })} type="text" name="to" placeholder="Receiver address..." className="border text-base p-2 rounded-md focus:ring-inset dark:border-gray-700 dark:text-gray-100 dark:bg-gray-800 focus:ring-violet-400 w-full" />
              </div>
              <div className='mt-5'>
                <label htmlFor="amount" className="block font-semibold mb-1">Amount</label>
                <div className="flex">
                  <input onBlur={(e) => setTransaction({ ...transaction, [e.target.name]: e.target.value })} type="number" name="amount" placeholder="Amount transfer..." className="flex flex-1 border text-base p-2 rounded-l-md focus:ring-inset dark:border-gray-700 dark:text-gray-100 dark:bg-gray-800 focus:ring-violet-400" />
                  <span className="flex items-center px-3 pointer-events-none text-base p-2 rounded-r-md dark:bg-gray-700">ETH</span>
                </div>
              </div>
            </>
          ) : type === 'consensus' ? (
            <>
              <button className='font-semibold border border-dashed p-2 rounded-md border-green-500 text-green-500' onClick={() => setAddOwners([...addOwners, ""])}>Add owners +</button>
              {
                addOwners.map((el, i) => {
                  return (<div className='flex items-center my-2' key={i}>
                    <input
                      className="text-white border border-green-500 outline-none text-sm rounded-lg focus:border-green-700 block w-full p-2.5 bg-gray-800"
                      placeholder='Enter new owner wallet'
                      value={el}
                      onChange={(e) => handleInputAdd(i, e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="ml-2 w-8 h-8 flex justify-center items-center font-semibold border border-dashed rounded dark:border-gray-100 dark:text-gray-100 hover:bg-violet-400 hover:bg-opacity-50"
                      onClick={() => { addOwners.splice(i, 1); setAddOwners([...addOwners]) }}
                    ><MdClose size={25} /></button>
                  </div>)
                })
              }
              <hr className='my-5' />
              <button className='block mt-5 font-semibold border border-dashed p-2 rounded-md border-red-500 text-red-500' onClick={() => setDelOwners([...delOwners, ""])}>Del owners +</button>
              {
                delOwners.map((el, i) => {
                  return (<div className='flex items-center my-2' key={i}>
                    <input
                      className="text-white border border-red-500 outline-none text-sm rounded-lg focus:border-red-700 block w-full p-2.5 bg-gray-800"
                      placeholder='Enter new owner wallet'
                      value={el}
                      onChange={(e) => handleInputDel(i, e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="ml-2 w-8 h-8 flex justify-center items-center font-semibold border border-dashed rounded dark:border-gray-100 dark:text-gray-100 hover:bg-violet-400 hover:bg-opacity-50"
                      onClick={() => { delOwners.splice(i, 1); setDelOwners([...delOwners]) }}
                    ><MdClose size={25} /></button>
                  </div>)
                })
              }
              <hr className='my-5' />
              <div>
                <label htmlFor="approvalRequired" className="block font-semibold mb-1">Approval Required</label>
                <input onBlur={(e) => setApprovalRequired(e.target.value)} type='number' min={1} required placeholder="Approval required..." className="border text-base p-2 rounded-md focus:ring-inset dark:border-gray-700 dark:text-gray-100 dark:bg-gray-800 focus:ring-violet-400 w-full" />
              </div>
            </>
          ) : (
            <>
              <div className='mt-5'>
                <label className="block font-semibold mb-1">Amount</label>
                <div className="flex">
                  <input onBlur={(e) => setAmount(e.target.value)} type="number" name="amount" placeholder="Amount deposit..." className="flex flex-1 border text-base p-2 rounded-l-md focus:ring-inset dark:border-gray-700 dark:text-gray-100 dark:bg-gray-800 focus:ring-violet-400" />
                  <span className="flex items-center px-3 pointer-events-none text-base p-2 rounded-r-md dark:bg-gray-700">ETH</span>
                </div>
              </div>
            </>
          )
          }
          <div className='flex justify-center'>
            <button
              type="button"
              className="px-5 py-2 mt-8 font-semibold rounded-md text-sm dark:bg-violet-600 dark:text-white dark:hover:text-black transition-all duration-500"
              onClick={() => handleSubmit()}
            >
              CREATE ID
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalID