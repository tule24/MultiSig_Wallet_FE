import React from 'react'
import { ChartStats } from '@/components/stats'
import { IdAccordian } from '@/components/home'
const Stats = () => {
    return (
        <div className='flex justify-center items-center flex-col pt-32 h-full w-full'>
            <ChartStats />
            <div className='w-3/4'>
                <IdAccordian title='ID HISTORY' />
            </div>
        </div>
    )
}

export default Stats