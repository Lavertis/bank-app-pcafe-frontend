import { Customer } from '../../../types/accountInfo';
import { Table, TableRow } from './Table';

export const CustomerInfo = ({
  account
}: {
  account: Customer;
}) => {
  return (
    
    <article>
      <h1>Siema: {account.firstName}</h1>
      <Table>
        <TableRow heading="id" value={account.id} />
        <TableRow heading="userName" value={account.appUser.userName} />
        <TableRow heading="firstName" value={account.firstName} />
        <TableRow heading="lastName" value={account.secondName} />
        <TableRow heading="salary" value={account.lastName} />
        <TableRow heading="date of employment" value={account.nationalId} />
        <TableRow heading="appUser id" value={account.cityOfBirth} />
        <TableRow heading="phoneNUmberConfirmed" value={account.fathersName} />
      </Table>
    </article>
  );
};