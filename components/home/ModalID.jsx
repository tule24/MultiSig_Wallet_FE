import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { MdClose } from 'react-icons/md'
import { toast } from 'react-toastify'
import WAValidator from "wallet-address-validator"

const ModalID = ({ type, setOpenModal, handleDispatch }) => {
  const [addOwners, setAddOwners] = useState([])
  const [delOwners, setDelOwners] = useState([])
  const [approvalsRequired, setApprovalsRequired] = useState(2)
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
  const [address, setAddress] = useState('')

  const handleSubmit = () => {
    switch (type) {
      case 'transaction': {
        if (!WAValidator.validate(transaction?.to, 'ETH', 'testnet')) {
          toast.error('Make sure receiver address is valid')
          break
        }
        if (transaction.amount <= 0) {
          toast.error('Make sure amount transfer > 0')
          break
        }
        handleDispatch(transaction)
        setOpenModal(false)
        break
      }
      case 'consensus': {
        const isAddress = addOwners.every(address => WAValidator.validate(address, 'ETH', 'testnet')) && delOwners.every(address => WAValidator.validate(address, 'ETH', 'testnet'))
        if (!isAddress) {
          toast.error('Make sure all address is valid')
          break
        }
        handleDispatch({ addOwners, delOwners, approvalsRequired })
        setOpenModal(false)
        break
      }
      case 'deposit': {
        if (amount <= 0) {
          toast.error('Make sure amount deposit > 0')
          break
        }
        handleDispatch(Number(amount))
        setOpenModal(false)
        break
      }
      default: {
        if (!WAValidator.validate(address, 'ETH', 'testnet')) {
          toast.error('Make sure wallet address is valid')
          break
        }
        handleDispatch(address)
      }
    }
  }
  return (
    <div className=' fixed top-0 left-0 right-0 h-screen flex justify-center items-center bg-gray-500 bg-opacity-60 z-50 text-white'>
      <div className='flex flex-col w-1/3 rounded-lg overflow-hidden'>
        <div className='grid grid-cols-[6fr_1fr] bg-violet-800'>
          <h3 className='p-3 text-center text-lg tracking-wide font-semibold'>{type === 'transaction' ? 'Create Transaction ID' : type === 'consensus' ? 'Create Consensus ID' : type === 'deposit' ? 'Deposit Wallet' : 'Add Wallet'}</h3>
          <button className='flex justify-center items-center bg-violet-900 p-2 border-none border-l border-l-white outline-none cursor-pointer transition-all duration-200 hover:bg-violet-400' onClick={() => setOpenModal(false)}><AiOutlineClose size={20} /></button>
        </div>
        <div className='p-5 w-full bg-gray-900'>
          {type === 'transaction' ? (
            <>
              <h2 className='mb-3 italic text-sm text-center text-yellow-600'>⚠️ Verify that wallet doesn't have any consensus ID pending ⚠️ <br /> before you make a transaction ID</h2>
              <div>
                <label htmlFor="to" className="block font-semibold mb-1">Receiver</label>
                <input onBlur={(e) => setTransaction({ ...transaction, [e.target.name]: e.target.value })} type="text" name="to" placeholder="Receiver address..." className="border text-base p-2 rounded-md focus:ring-inset border-gray-700 text-gray-100 bg-gray-800 focus:ring-violet-400 w-full" />
              </div>
              <div className='mt-5'>
                <label htmlFor="amount" className="block font-semibold mb-1">Amount</label>
                <div className="flex">
                  <input onBlur={(e) => setTransaction({ ...transaction, [e.target.name]: e.target.value })} type="number" name="amount" placeholder="Amount transfer..." className="flex flex-1 border text-base p-2 rounded-l-md focus:ring-inset border-gray-700 text-gray-100 bg-gray-800 focus:ring-violet-400" />
                  <span className="flex items-center px-3 pointer-events-none text-base p-2 rounded-r-md bg-gray-700">ETH</span>
                </div>
              </div>
            </>
          ) : type === 'consensus' ? (
            <>
              <h2 className='mb-3 italic text-sm text-center text-yellow-600'>⚠️ Verify that wallet doesn't have any ID pending ⚠️ <br /> before you make a consensus ID</h2>
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
                      className="ml-2 w-8 h-8 flex justify-center items-center font-semibold border border-dashed rounded border-gray-100 text-gray-100 hover:bg-violet-400 hover:bg-opacity-50"
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
                      className="ml-2 w-8 h-8 flex justify-center items-center font-semibold border border-dashed rounded border-gray-100 text-gray-100 hover:bg-violet-400 hover:bg-opacity-50"
                      onClick={() => { delOwners.splice(i, 1); setDelOwners([...delOwners]) }}
                    ><MdClose size={25} /></button>
                  </div>)
                })
              }
              <hr className='my-5' />
              <div>
                <label htmlFor="approvalsRequired" className="block font-semibold mb-1">Approval Required</label>
                <input onBlur={(e) => setApprovalsRequired(e.target.value)} type='number' min={2} required placeholder="Approval required..." className="border text-base p-2 rounded-md focus:ring-inset border-gray-700 text-gray-100 bg-gray-800 focus:ring-violet-400 w-full" />
              </div>
            </>
          ) : type === 'deposit' ? (
            <>
              <div className='mt-5'>
                <label className="block font-semibold mb-1">Amount</label>
                <div className="flex">
                  <input onBlur={(e) => setAmount(e.target.value)} type="number" name="amount" placeholder="Amount deposit..." className="flex flex-1 border text-base p-2 rounded-l-md focus:ring-inset border-gray-700 text-gray-100 bg-gray-800 focus:ring-violet-400" />
                  <span className="flex items-center px-3 pointer-events-none text-base p-2 rounded-r-md bg-gray-700">ETH</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <h2 className='mb-3 italic text-sm text-center text-yellow-600'>⚠️ Verify that you are owner of wallet ⚠️</h2>
              <div className='mt-5'>
                <label className="block font-semibold mb-1">Wallet address</label>
                <div className="flex">
                  <input onBlur={(e) => setAddress(e.target.value)} type="text" name="address" placeholder="Wallet address..." className="flex flex-1 border text-base p-2 rounded-l-md focus:ring-inset border-gray-700 text-gray-100 bg-gray-800 focus:ring-violet-400" />
                </div>
              </div>
            </>
          )
          }
          <div className='flex justify-center'>
            <button
              type="button"
              className="px-5 py-2 mt-8 font-semibold rounded-md text-sm bg-violet-600 text-white hover:text-black transition-all duration-500"
              onClick={() => handleSubmit()}
            >
              {type === 'deposit' ? 'DEPOSIT' : type === 'addWallet' ? 'ADD WALLET' : 'CREATE ID'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalID