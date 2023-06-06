import React, { useState, useEffect } from 'react';
import { useErrorBoundary } from 'react-error-boundary';

import type { CloudAccountStats } from '../../types/cloudAccount';

import { fetchApiData } from '../../helpers/api';
import { AccountSelector } from '../../components/accountSelector';
import { CostsWidget } from '../../components/costsWidget';
import AccountHistory from './AccountHistory';

import '../../styles/routes/dashboard/dashboard.css';

export default function Dashboard() {
    const [selectedAccountId, setSelectedAccountId] = useState<string>('');
    const [accountCosts, setAccountCosts] = useState<CloudAccountStats>({});

    const { showBoundary } = useErrorBoundary();

    const switchAccount = (value: string) => {
        setSelectedAccountId(value);
    };

    useEffect(() => {
        if (selectedAccountId && selectedAccountId.length > 0) {
            fetchApiData<CloudAccountStats>(`https://hiring.tailwarden.com/v1/accounts/${selectedAccountId}`).then(
                (response) => {
                    setAccountCosts(response);
                },
                (error) => {
                    showBoundary(error);
                }
            );
        }
    }, [showBoundary, selectedAccountId]);

    return (
        <div className='application'>
            <header className='header'>
                <AccountSelector onSelect={switchAccount} />
            </header>
            <div className='dashboard-wrapper'>
                <div className='costs-wrapper'>
                    {Object.entries(accountCosts).map((entry) => (
                        <CostsWidget key={entry[0]} label={entry[0]} amount={entry[1]} image={`/${entry[0]}.svg`} />
                    ))}
                </div>
                <div className='account-history-wrapper'>
                    <AccountHistory selectedAccountId={selectedAccountId} />
                </div>
            </div>
        </div>
    );
}
