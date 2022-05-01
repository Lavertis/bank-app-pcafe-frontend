export interface Account {
    id: number;
    number: number;
    balance: number;
    transferLimit: number;
    isActive: boolean;
    accountTypeCode: string;
    accountTypeName: string;
    interestRate: number;
    currencyCode: string;
    transferCount: number;
}