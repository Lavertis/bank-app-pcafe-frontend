export type AccountInfo = {
    id: string,
    firstName: string,
    lastName: string,
    salary: number,
    dateOfEmployment: string
    appUser: {
      id:string,
      userName: string,
      phoneNumberConfirmed: string
    }

  };


export type Customer = {
    id: string,
    appUser:{
      userName: string
    }
    firstName: string,
    secondName: string,
    lastName: string,
    nationalId: string,
    cityOfBirth: string,
    fathersName: string
}

export type BankAccount = {
  id: 0,
  number: string,
  balance: 0,
  transferLimit: 0,
  accountType: {
    id: 0,
    code: string,
    name: string,
  }
}

export type TransferProps = {
  id: 0,
  amount: number,
  receiverAccountNumber: string,
  receiveName:string,
  description: string
}