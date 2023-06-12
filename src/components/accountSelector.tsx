import { ChangeEvent, useEffect, useState, memo } from 'react';
import { useErrorBoundary } from 'react-error-boundary';

import type { CloudAccount } from '../types/cloudAccount';

import { fetchApiData } from '../helpers/api';

import '../styles/components/accountSelector.css';

type AccountSelectorProps = {
    onSelect: (selectedValue: string) => void;
};

export const AccountSelector = memo(function AccountSelector(props: AccountSelectorProps) {
    const [accounts, setAccounts] = useState<CloudAccount[]>([]);
    const [selectedAccount, setSelectedAccount] = useState<CloudAccount>();
    const { showBoundary } = useErrorBoundary();

    useEffect(() => {
        fetchApiData<CloudAccount[]>('https://hiring.tailwarden.com/v1/accounts').then(
            (response) => {
                setAccounts(response);
            },
            (error: Error) => {
                showBoundary(error);
            }
        );
    }, [showBoundary]);

    const onChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        const {
            target: { value },
        } = event;

        accounts.forEach((account) => {
            if (account.id === value) {
                setSelectedAccount(account);
            }
        });

        props.onSelect(value);
    };

    return (
        <div className='account-selector-wrapper'>
            <div>
                <label htmlFor='account-selector'>Account:</label>
                <select
                    onChange={onChangeHandler}
                    defaultValue=''
                    className='account-selector'
                    data-testid='account-selector'
                >
                    <option value='' disabled data-testid='option'>
                        Choose an account
                    </option>
                    {accounts.map((opt) => (
                        <option key={opt.id} value={opt.id} data-testid='option'>
                            {opt.provider} - {opt.label}
                        </option>
                    ))}
                </select>
            </div>
            {selectedAccount && <img src={selectedAccount.logo} alt='account logo' />}
        </div>
    );
});
