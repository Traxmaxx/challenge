import React from 'react';
import ReactDOM from 'react-dom/client';
import { useErrorBoundary, ErrorBoundary } from 'react-error-boundary';

import Dashboard from './routes/dashboard/Dashboard';

import './styles/index.css';

const ErrorFallback = ({ error }: { error: Error }) => {
    const { resetBoundary } = useErrorBoundary();

    return (
        <div role='alert'>
            <p>Something went wrong:</p>
            <pre style={{ color: 'red' }}>{error.message}</pre>
            <button onClick={resetBoundary}>Try again</button>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Dashboard />
    </ErrorBoundary>
);
