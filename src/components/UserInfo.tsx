import { AccountInfo } from '../types/accountInfo';
import { Table, TableRow } from './Table';

export const UserInfo = ({
  account
}: {
  account: AccountInfo;
}) => {
  return (
    
    <article>
      <h1>Siema: {account.firstName}</h1>
      <Table>
        <TableRow heading="id" value={account.id} />
        <TableRow heading="firstName" value={account.firstName} />
        <TableRow heading="lastName" value={account.lastName} />
        <TableRow heading="salary" value={account.salary} />
        <TableRow heading="date of employment" value={account.dateOfEmployment} />
        <TableRow heading="appUser id" value={account.appUser.id} />
        <TableRow heading="phoneNUmberConfirmed" value={account.appUser.phoneNumberConfirmed} />
      </Table>
    </article>
  );
};