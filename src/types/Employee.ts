import {AppUser} from "./AppUser";

export interface Employee {
    id: string;
    firstName: string;
    lastName: string;
    salary: number;
    gender: string;
    dateOfEmployment: Date;
    dateOfBirth: Date
    appUser: AppUser
}