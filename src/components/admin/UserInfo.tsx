import { AccountInfo } from '../../types/accountInfo';
import { TableCell, TableRow } from '../../DOMComponents/Table';;

export const UserInfo = ({
  account
}: {
  account: AccountInfo;
}) => {
  return (
      <TableRow>
      <TableCell  value={account.id} />
      <TableCell value={account.firstName} />
      <TableCell value={account.lastName} />
      <TableCell value={account.salary} />
      <TableCell  value={account.dateOfEmployment} />
      <TableCell value={account.appUser.id} />
      <TableCell value={account.appUser.phoneNumberConfirmed} />
      </TableRow>
  );
};