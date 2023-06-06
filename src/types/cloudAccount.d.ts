export type CloudAccount = {
    id: string;
    provider: string;
    label: string;
    logo: string;
};

export type CloudAccountStats = {
    bill?: number;
    servers?: number;
    regions?: number;
    alarms?: number;
};

export type CloudAccountHistory = {
    date: string;
    groups: Array<{
        key: string;
        amount: number;
    }>;
};
