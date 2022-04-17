import { TransferProps} from '../../types/accountInfo';
import { TableCell, TableRow } from '../../DOMComponents/Table';

export const TransferInfo = ({
  account
}: {
  account: TransferProps;
}) => {
  return (
      <TableRow>
      <TableCell  value={account.id} />
      <TableCell value={account.amount} />
      <TableCell value={account.receiverAccountNumber} />
      <TableCell value={account.receiveName} />
      <TableCell  value={account.description} />
      </TableRow>
  );
};