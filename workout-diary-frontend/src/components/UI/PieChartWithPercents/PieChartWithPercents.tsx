import React from "react";
import {Cell, Pie, PieChart,} from "recharts";

export interface PieChartData {
    name: string,
    value: number
}

interface Props {
    data: PieChartData[]
}

const RADIAN = Math.PI / 180;
const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

// @ts-ignore
const renderCustomizedLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent, index}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

export const PieChartWithPercents = ({data}: Props) => {
    return (
        <PieChart width={250} height={250}>
            <Pie data={data}
                 dataKey="value"
                 nameKey="name"
                 cx="50%"
                 cy="50%"
                 labelLine={false}
                 fill="#82ca9d"
                 label={renderCustomizedLabel}
            >
                {
                    data.map((entry, index) => <Cell key={entry.name}
                                                             fill={COLORS[index % COLORS.length]}/>)
                }
            </Pie>
        </PieChart>
    )
}