import { fetchApiData } from './api';

beforeEach(() => {
    // @ts-ignore
    jest.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(Promise.resolve(['foo', 'bar'])),
    });
});

afterEach(() => {
    jest.clearAllMocks();
});

it('fetches an api endpoint properly', async () => {
    const response = await fetchApiData('https://example.com/path');

    expect(response).toMatchObject(['foo', 'bar']);
    expect(fetch).toHaveBeenCalledTimes(1);
});
