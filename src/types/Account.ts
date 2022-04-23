import {AccountType} from "./AccountType";
import {Currency} from "./Currency";

export interface Account {
    id: number;
    number: number;
    balance: number;
    transferLimit: number;
    isActive: boolean;
    accountType: AccountType;
    currency: Currency;
}