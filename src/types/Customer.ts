import {AppUser} from "./AppUser";

export interface Customer {
    id: string;
    firstName: string;
    secondName: string;
    lastName: string;
    nationalId: string;
    dateOfBirth: Date;
    cityOfBirth: string;
    fathersName: string;
    appUser: AppUser;
}