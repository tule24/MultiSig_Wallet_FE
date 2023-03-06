import React, { useMemo } from 'react'
import { ChartStats } from '@/components/stats'
import { IdAccordian } from '@/components/home'
import { useSelector } from 'react-redux'
import { NotConnect } from '@/components/home'

const Stats = () => {
    const { proposals } = useSelector(state => state.ProposalReducer)
    const { signer } = useSelector(state => state.Web3Reducer)
    const ids = useMemo(() => proposals.filter(ele => ele.state !== 'pending'), [proposals])
    return (
        <div className='flex justify-center items-center flex-col pt-40 pb-10 h-full w-full bg-white text-black dark:bg-black dark:text-white'>
            {signer ? <>
                <ChartStats />
                <div className='w-3/4'>
                    <IdAccordian title='ID HISTORY' ids={ids} />
                </div>
            </> : <NotConnect />}
        </div>
    )
}

export default Stats