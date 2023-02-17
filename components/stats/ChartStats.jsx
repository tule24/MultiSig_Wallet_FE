import React from 'react'
import { PieChartStats, BarChartStats } from './index'
const data_1 = [
    { name: 'SUCCESS', value: 4 },
    { name: 'FAIL', value: 3 },
    { name: 'PENDING', value: 2 },
]
const data_2 = [
    { name: 'TRANSACTION', value: 8 },
    { name: 'CONSENSUS', value: 1 },
]
const data_3 = [
    {
        "name": "Owner A",
        "approve": 5,
        "reject": 3,
        "unvote": 2,
    },
    {
        "name": "Owner B",
        "approve": 7,
        "reject": 2,
        "unvote": 1,
    },
    {
        "name": "Owner C",
        "approve": 6,
        "reject": 2,
        "unvote": 2,
    }
]
const COLORS = ['#00C851', '#FF4444', '#FFBB33'];

const ChartStats = () => {
    return (
        <div className='w-3/4 h-3/4'>
            <div className='w-full h-full flex justify-between'>
                <div className='p-4 w-[550px] h-[350px] flex flex-col border dark:border-white rounded-lg justify-center items-center'>
                    <div className='w-full h-4/5'>
                        <PieChartStats data={data_1} colors={COLORS} />
                    </div>
                    <h1 className='text-2xl font-bold tracking-wide text-violet-500'>ID STATE RATE</h1>
                </div>
                <div className='p-4 w-[550px] h-[350px] flex flex-col border dark:border-white rounded-lg justify-center items-center'>
                    <div className='w-full h-4/5'>
                        <PieChartStats data={data_2} colors={COLORS} />
                    </div>
                    <h1 className='text-2xl font-bold tracking-wide text-violet-500'>ID TYPE RATE</h1>
                </div>
            </div>
            <div className='w-full h-[500px] mt-20 mb-5'>
                <BarChartStats data={data_3} />
            </div>
            <h1 className='text-3xl font-bold tracking-wide text-violet-500 text-center mb-5'>OWNER VOTE STATS</h1>
        </div>
    )
}

export default ChartStats