import React, { useContext } from 'react'
import Head from 'next/head'
import { MSFactoryContext } from "@/Context/MSFactoryContext"
const Home = () => {
  const { theme, setTheme } = useContext(MSFactoryContext)
  const changeTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }
  return (
    <>
      <Head>
        <title>MultiSig Wallet</title>
        <meta name="description" content="Multisig Wallet Project" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='bg-white text-black dark:bg-black dark:text-white h-screen w-screen'>
      </div>
    </>
  )
}

export default Home