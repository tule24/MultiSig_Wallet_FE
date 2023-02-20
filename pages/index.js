import React, { useMemo } from 'react'
import Head from 'next/head'
import { WalletInfo, IdAccordian, CreateID } from '@/components/home'
import { useSelector } from 'react-redux'
const Home = () => {
  const { proposals } = useSelector(state => state.ProposalReducer)
  const ids = useMemo(proposals.filter(ele => ele.state === 'pending'), [proposals])
  return (
    <>
      <Head>
        <title>MultiSig Wallet</title>
        <meta name="description" content="Multisig Wallet Project" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='bg-gray-200 text-black dark:bg-black dark:text-white h-full w-full'>
        <div className='w-4/5 mx-auto pt-32'>
          <WalletInfo />
          <CreateID />
          <IdAccordian title='ID PENDING' ids={ids} />
        </div>
      </div>
    </>
  )
}

export default Home