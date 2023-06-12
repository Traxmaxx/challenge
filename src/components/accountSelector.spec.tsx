import { useErrorBoundary, ErrorBoundary } from 'react-error-boundary';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

test('renders account dropdown', async () => {
    jest.useFakeTimers();

    render(
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <AccountSelector onSelect={onSelect} />
        </ErrorBoundary>
    );
    
    await act(async () => {
        jest.runOnlyPendingTimers();
    });

    expect(screen.getByText(/Choose an account/i)).toBeInTheDocument();
});

test('allows to select an option fetched during render', async () => {
    jest.useFakeTimers();

    render(
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <AccountSelector onSelect={onSelect} />
        </ErrorBoundary>
    );

    await act(async () => {
        jest.runOnlyPendingTimers();
    })

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
        userEvent.selectOptions(screen.getByTestId('account-selector'), ['AWS - production']);
    });

    const options = screen.getAllByTestId('option') as HTMLOptionElement[];
    expect(options[1].selected).toBeTruthy();
});
