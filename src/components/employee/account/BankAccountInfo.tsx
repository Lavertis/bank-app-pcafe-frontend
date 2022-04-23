import { BankAccount } from "../../../types/accountInfo";
import { TableCell, TableRow } from "../../../DOMComponents/Table";

export const BankAccountInfo = ({ account }: { account: BankAccount }) => {
  return (
    <TableRow>
      <TableCell value={account.id} />
      <TableCell value={account.number} />
      <TableCell value={account.balance} />
      <TableCell value={account.transferLimit} />
      <TableCell value={account.accountType.id} />
      <TableCell value={account.accountType.code} />
      <TableCell value={account.accountType.name} />
    </TableRow>
  );
};
