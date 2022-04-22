import {BankAccountType} from "./BankAccountType";
import {Currency} from "./Currency";

export interface BankAccount {
    id: number;
    number: number;
    balance: number;
    transferLimit: number;
    isActive: boolean;
    accountType: BankAccountType;
    currency: Currency;
}