import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createID } from '@/redux/thunk/ProposalAction'
import { MdClose } from "react-icons/md"
import { toast } from "react-toastify"
import { checkAddressValid, checkDistinct, isOwner } from '@/helpers'

const FormConsensusID = () => {
    const [addOwners, setAddOwners] = useState([])
    const [delOwners, setDelOwners] = useState([])
    const [approvalsRequired, setApprovalsRequired] = useState(2)
    const { wallet } = useSelector(state => state.WalletReducer)
    const dispatch = useDispatch()

    const handleInputAdd = (i, value) => {
        addOwners[i].address = value.toLowerCase().trim()
        addOwners[i].error = ""

        if (!checkAddressValid(value)) {
            addOwners[i].error = "Address invalid"
        }
        if (isOwner(value, wallet?.owners || [])) {
            addOwners[i].error = "Address is owner"
        }
        if (!checkDistinct(addOwners.map(el => el.address))) {
            addOwners[i].error = "Address is exist"
        }
        setAddOwners([...addOwners])
    }

    const handleInputDel = (i, value) => {
        delOwners[i].address = value.toLowerCase().trim()
        delOwners[i].error = ""

        if (!isOwner(value, wallet?.owners || [])) {
            delOwners[i].error = "Address isn't owner"
        }
        if (!checkDistinct(delOwners.map(el => el.address))) {
            delOwners[i].error = "Address is exist"
        }
        setDelOwners([...delOwners])
    }

    const handleSubmit = () => {
        const isAddress = addOwners.every(value => value.address && value.error === "") && delOwners.every(value => value.address && value.error === "")
        const isApprovalsValid = approvalsRequired <= wallet.owners.length + addOwners.length - delOwners.length
        if (!isAddress) {
            toast.error('Make sure all address valid')
        } else if (!isApprovalsValid) {
            toast.error('Make sure approvalsRequired valid')
        } else {
            dispatch(createID('consensus', {
                addOwners: addOwners.map(el => el.address),
                delOwners: delOwners.map(el => el.address),
                approvalsRequired
            }))
        }
    }
    return (
        <div>
            <h2 className='mb-3 italic text-sm text-center text-yellow-600'>⚠️ Verify that wallet doesn't have any ID pending ⚠️ <br /> before you make a consensus ID</h2>
            <button className='font-semibold border border-dashed p-2 rounded-md border-green-500 text-green-500' onClick={() => setAddOwners([...addOwners, { address: "", error: "" }])}>Add owners +</button>
            {
                addOwners.map((el, i) => {
                    return (
                        <div>
                            <div className='flex items-center my-2' key={i}>
                                <input
                                    className="text-white border border-green-500 outline-none text-sm rounded-lg focus:border-green-700 block w-full p-2.5 bg-gray-800"
                                    placeholder='Enter new owner wallet'
                                    onBlur={(e) => handleInputAdd(i, e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="ml-2 w-8 h-8 flex justify-center items-center font-semibold border border-dashed rounded border-gray-100 text-gray-100 hover:bg-violet-400 hover:bg-opacity-50"
                                    onClick={() => { addOwners.splice(i, 1); setAddOwners([...addOwners]) }}
                                ><MdClose size={25} /></button>
                            </div>
                            {el.error && <p className="text-[12px] font-semibold text-red-500">{el.error}</p>}
                        </div>
                    )
                })
            }
            <hr className='my-5' />
            <button className='block mt-5 font-semibold border border-dashed p-2 rounded-md border-red-500 text-red-500' onClick={() => setDelOwners([...delOwners, { address: "", error: "" }])}>Del owners +</button>
            {
                delOwners.map((el, i) => {
                    return (
                        <div>
                            <div className='flex items-center my-2' key={i}>
                                <input
                                    className="text-white border border-red-500 outline-none text-sm rounded-lg focus:border-red-700 block w-full p-2.5 bg-gray-800"
                                    placeholder='Enter new owner wallet'
                                    onBlur={(e) => handleInputDel(i, e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="ml-2 w-8 h-8 flex justify-center items-center font-semibold border border-dashed rounded border-gray-100 text-gray-100 hover:bg-violet-400 hover:bg-opacity-50"
                                    onClick={() => { delOwners.splice(i, 1); setDelOwners([...delOwners]) }}
                                ><MdClose size={25} /></button>
                            </div>
                            {el.error && <p className="text-[12px] font-semibold text-red-500">{el.error}</p>}
                        </div>
                    )
                })
            }
            <hr className='my-5' />
            <div>
                <label htmlFor="approvalsRequired" className="block font-semibold mb-1">Approval Required</label>
                <input onBlur={(e) => setApprovalsRequired(e.target.value)} type='number' min={2} required placeholder="Approval required..." className="border text-base p-2 rounded-md focus:ring-inset border-gray-700 text-gray-100 bg-gray-800 focus:ring-violet-400 w-full" />
            </div>
            <button
                type="button"
                className="block w-1/2 p-3 mt-5 mx-auto text-center rounded-md text-sm bg-violet-600 text-white hover:text-black transition-all duration-100"
                onClick={() => handleSubmit()}
            >
                Submit
            </button>
        </div>
    )
}

export default FormConsensusID