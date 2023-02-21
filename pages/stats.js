import React, { useMemo } from 'react'
import { ChartStats } from '@/components/stats'
import { IdAccordian } from '@/components/home'
import { useSelector } from 'react-redux'

const Stats = () => {
    const { proposals } = useSelector(state => state.ProposalReducer)
    const ids = useMemo(() => proposals.filter(ele => ele.state !== 'pending'), [proposals])
    return (
        <div className='flex justify-center items-center flex-col pt-32 h-full w-full'>
            {/* <ChartStats /> */}
            <div className='w-3/4'>
                <IdAccordian title='ID HISTORY' ids={ids} />
            </div>
        </div>
    )
}

export default Stats