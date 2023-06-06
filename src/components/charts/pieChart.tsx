import { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import autocolors from 'chartjs-plugin-autocolors';

import { extractPieChartDataSets, extractUniqueCostGroups } from '../../helpers/chartData';

import type { CloudAccountHistory } from '../../types/cloudAccount';
import type { ChartData } from 'chart.js';

export type PieChartProps = {
    chartData?: CloudAccountHistory[];
    selectedAccountId?: string;
};

export default function PieChart(props: PieChartProps) {
    const [accountHistoryChartData, setAccountHistoryChartData] = useState<ChartData<'pie', number[], unknown>>();

    useEffect(() => {
        if (props.chartData) {
            setAccountHistoryChartData({
                labels: extractUniqueCostGroups(props.chartData),
                datasets: extractPieChartDataSets(props.chartData),
            });
        }
    }, [props.chartData]);

    ChartJS.register(ArcElement, Tooltip, Legend, autocolors);

    const options = {
        plugins: {
            title: {
                display: true,
                text: 'Spent by service',
            },
        },
        responsive: true,
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
            },
        },
    };

    return (
        <>
            {accountHistoryChartData && (
                <Pie key={props.selectedAccountId} data={accountHistoryChartData} options={options} />
            )}
        </>
    );
}
