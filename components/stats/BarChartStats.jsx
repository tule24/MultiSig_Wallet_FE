import React, { memo } from 'react'
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from 'recharts'
const BarChartStats = ({data}) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart width={730} height={250} data={data}>
                <CartesianGrid strokeDasharray="2 2" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="accept" fill="#00C851" />
                <Bar dataKey="reject" fill="#FF4444" />
                <Bar dataKey="unvote" fill="#FFBB33" />
            </BarChart>
        </ResponsiveContainer>
    )
}

export default memo(BarChartStats)