import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import autocolors from 'chartjs-plugin-autocolors';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

import { extractDateLabels, extractBarChartDataSets } from '../../helpers/chartData';

import type { CloudAccountHistory } from '../../types/cloudAccount';
import type { ChartData } from 'chart.js';

export type StackedBarChartProps = {
    chartData?: CloudAccountHistory[];
    selectedAccountId?: string;
};

export default function StackedBarChart(props: StackedBarChartProps) {
    const [accountHistoryChartData, setAccountHistoryChartData] = useState<ChartData<'bar', number[], unknown>>();

    useEffect(() => {
        if (props.chartData) {
            setAccountHistoryChartData({
                labels: extractDateLabels(props.chartData),
                datasets: extractBarChartDataSets(props.chartData),
            });
        }
    }, [props.chartData]);

    ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, autocolors);

    const options = {
        plugins: {
            title: {
                display: true,
                text: 'Costs per month - Stacked',
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
                <Bar key={props.selectedAccountId} data={accountHistoryChartData} options={options} />
            )}
        </>
    );
}
