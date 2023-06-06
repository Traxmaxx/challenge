import {
    extractDateLabels,
    extractBarChartDataSets,
    extractUniqueCostGroups,
    extractCostGroupValues,
    extractPieChartDataSets,
} from './chartData';

const mockData = [
    {
        date: '2021-04-01T00:00:00.000Z',
        groups: [
            {
                key: 'Compute',
                amount: 53.33,
            },
            {
                key: 'Storage',
                amount: 146.1,
            },
            {
                key: 'Network',
                amount: 72.35,
            },
        ],
    },
    {
        date: '2021-02-01T00:00:00.000Z',
        groups: [
            {
                key: 'Compute',
                amount: 24.33,
            },
            {
                key: 'Storage',
                amount: 1337.1,
            },
            {
                key: 'Network',
                amount: 9.35,
            },
        ],
    },
];

it('extractDateLabels() extracts date labels properly', () => {
    const result = extractDateLabels(mockData);

    expect(result).toMatchObject(['April 2021', 'February 2021']);
});

it('extractBarChartDataSets() extracts bar chart data properly', () => {
    const result = extractBarChartDataSets(mockData);
    expect(result).toMatchObject([
        {
            data: [53.33, 24.33],
            label: 'Compute',
        },
        {
            data: [146.1, 1337.1],
            label: 'Storage',
        },
        {
            data: [72.35, 9.35],
            label: 'Network',
        },
    ]);
});

it('extractUniqueCostGroups() extracts a list of unique cost groups', () => {
    const result = extractUniqueCostGroups(mockData);
    expect(result).toMatchObject(['Compute', 'Storage', 'Network']);
});

it('extractCostGroupValues() extracts a list of values for a specified cost group', () => {
    const result = extractCostGroupValues(mockData, 'Compute');
    expect(result).toMatchObject([53.33, 24.33]);
});

it('extractPieChartDataSets extracts pie chart data properly', () => {
    const result = extractPieChartDataSets(mockData);
    expect(result).toMatchObject([
        {
            label: 'accumulated costs',
            data: [77.66, 1483.1999999999998, 81.69999999999999],
        },
    ]);
});
