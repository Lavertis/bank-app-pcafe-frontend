import { Customer } from "../../../types/accountInfo";
import { TableCell, TableRow } from "../../../DOMComponents/Table";

export const CustomerInfo = ({ account }: { account: Customer }) => {
  return (
    <TableRow>
      <TableCell value={account.id} />
      <TableCell value={account.appUser.userName} />
      <TableCell value={account.firstName} />
      <TableCell value={account.secondName} />
      <TableCell value={account.lastName} />
      <TableCell value={account.nationalId} />
      <TableCell value={account.cityOfBirth} />
      <TableCell value={account.fathersName} />
    </TableRow>
  );
};
