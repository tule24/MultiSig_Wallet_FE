import React from "react"
import { useTheme } from 'next-themes'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import { toast } from 'react-toastify'
import axios from "axios"

export const MSFactoryContext = React.createContext()
export const MSFactoryProvider = (({ children }) => {
    const { theme, setTheme } = useTheme()

    return (
        <MSFactoryContext.Provider value={{ theme, setTheme }}>
            {children}
        </MSFactoryContext.Provider>
    )
})

