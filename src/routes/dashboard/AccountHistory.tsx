import { useState, useEffect } from 'react';
import { useErrorBoundary } from 'react-error-boundary';

import type { CloudAccountHistory } from '../../types/cloudAccount';

import { fetchApiData } from '../../helpers/api';
import StackedBarChart from '../../components/charts/stackedBarChart';
import PieChart from '../../components/charts/pieChart';

type AccountHistoryProps = {
    selectedAccountId?: string;
};

export default function AccountHistory(props: AccountHistoryProps) {
    const [accountHistoryChartData, setAccountHistoryChartData] = useState<CloudAccountHistory[]>();
    const { selectedAccountId } = props;
    const { showBoundary } = useErrorBoundary();

    useEffect(() => {
        if (selectedAccountId && selectedAccountId.length > 0) {
            fetchApiData<CloudAccountHistory[]>(
                `https://hiring.tailwarden.com/v1/accounts/${selectedAccountId}/history`
            ).then(
                (response) => {
                    setAccountHistoryChartData(response);
                },
                (error: Error) => {
                    showBoundary(error);
                }
            );
        }
    }, [showBoundary, selectedAccountId]);

    return (
        <>
            <div className='chart-wrapper'>
                <StackedBarChart chartData={accountHistoryChartData} selectedAccountId={selectedAccountId} />
            </div>
            <div className='chart-wrapper'>
                <PieChart chartData={accountHistoryChartData} selectedAccountId={selectedAccountId} />
            </div>
        </>
    );
}
