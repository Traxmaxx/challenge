import { useErrorBoundary, ErrorBoundary } from 'react-error-boundary';
import { render, screen, act, waitFor } from '@testing-library/react';
import { AccountSelector } from './accountSelector';

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

beforeEach(() => {
    // @ts-ignore
    jest.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(
            Promise.resolve([
                {
                    id: '62666a73422739696d520c91',
                    provider: 'AWS',
                    label: 'production',
                    logo: 'https://cdn.komiser.io/images/aws.png',
                },
            ])
        ),
    });
});

afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
});

const onSelect = jest.fn().mockResolvedValue('selected!');

test('renders learn react link', async () => {
    jest.useFakeTimers();

    render(
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <AccountSelector onSelect={onSelect} />
        </ErrorBoundary>
    );

    act(() => {
        jest.runOnlyPendingTimers();
        // jest.runAllTimers();
    });

    await waitFor(() => {
        expect(screen.getByText(/Account:/i)).toBeInTheDocument();
    });
});
