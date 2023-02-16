import React, { useState } from 'react'
import { MdAdd, MdClose } from 'react-icons/md'
const FormCreate = () => {
  const [total, setTotal] = useState([])
  const handleInput = (i, value) => {
    total[i] = value
    setTotal([...total])
  }
  return (
    <div className='w-1/2 mt-4'>
      <div className='flex flex-col justify-center items-center'>
        <div className="mb-6 w-full">
          <label className="block mb-2 text-md font-semibold text-gray-900 dark:text-white">Owner 1</label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={"0x1BfC7c4Bce1DB93Ea3F48BFC52A6a7fccc770D3B"}
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
                className="ml-2 w-8 h-8 flex justify-center items-center font-semibold border border-dashed rounded dark:border-gray-100 dark:text-gray-100 hover:bg-violet-400 hover:bg-opacity-50"
                onClick={() => { total.splice(i, 1); setTotal([...total]) }}
              ><MdClose size={25} /></button>
            </div>

          </div>
        ))}
        <button
          type="button"
          className="w-14 h-14 flex justify-center items-center font-semibold border border-dashed rounded dark:border-gray-100 dark:text-gray-100 hover:bg-violet-400 hover:bg-opacity-50"
          onClick={() => setTotal([...total, ""])}
        >
          <MdAdd size={25} />
        </button>
        <button type="submit" className="mt-8 text-lg tracking-wide text-white bg-violet-700 hover:bg-violet-900 focus:ring-4 focus:outline-none focus:ring-violet-300 font-semibold rounded-lg sm:w-auto px-5 py-2.5 text-center dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800">
          Create Multisig Wallet
        </button>
      </div>
    </div>
  )
}

export default FormCreate