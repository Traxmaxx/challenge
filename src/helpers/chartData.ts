import type { CloudAccountHistory } from '../types/cloudAccount';

export function extractDateLabels(historyData: CloudAccountHistory[]) {
    return historyData.map((historyDataEntry) => {
        const date = new Date(historyDataEntry.date);
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.toLocaleString('default', { year: 'numeric' });
        return `${month} ${year}`;
    });
}

export function extractBarChartDataSets(historyData: CloudAccountHistory[]) {
    const datasets: Array<{ label: string; data: number[] }> = [];
    // extract all cost groups used for stacking the bars
    const uniqueCostGroups = extractUniqueCostGroups(historyData);

    // match costs to it's group
    return uniqueCostGroups.map((costGroup: string) => {
        const dataset = {
            label: costGroup,
            data: extractCostGroupValues(historyData, costGroup),
        };

        return dataset;
    });
}

export function extractUniqueCostGroups(historyData: CloudAccountHistory[]) {
    // flatten array to have all cost groups only
    const costGroups = historyData.map((entry) => {
        return entry.groups;
    });

    // flatten again to get all the different groups without costs
    const costGroupCategories = costGroups
        .map((costGroupEntry) => {
            return costGroupEntry.map((groupEntry) => groupEntry.key);
        })
        .flat();

    // spread and make a set for having all unique groups
    return [...new Set(costGroupCategories)];
}

export function extractCostGroupValues(historyData: CloudAccountHistory[], costGroup: string) {
    // 
    const extractedCostGroups: number[] = [];
    const costGroups = historyData.map((entry) => {
        return entry.groups;
    });

    // 
    costGroups.forEach((group) => {
        return group.forEach((costs) => {
            if (costs.key === costGroup) {
                extractedCostGroups.push(costs.amount);
            }
        });
    });

    return extractedCostGroups;
}

export function extractPieChartDataSets(historyData: CloudAccountHistory[]) {
    // extract all cost groups used for stacking the bars
    const uniqueCostGroups = extractUniqueCostGroups(historyData);
    const flattenedCostsArray = historyData.map((entry) => entry.groups).flat();
    const summedTotalCosts: number[] = [];

    uniqueCostGroups.forEach((costGroup) => {
        // reset group total to zero
        let groupTotal = 0;

        // iterate through each group and sum all of it's costs
        flattenedCostsArray.forEach((costEntry) => {
            if (costEntry.key === costGroup) {
                groupTotal += costEntry.amount;
            }
        });

        summedTotalCosts.push(groupTotal);
    });

    return [
        {
            label: 'accumulated costs',
            data: summedTotalCosts,
        },
    ];
}
