import * as React from 'react';

export const TableRow = ({ children }: { children: React.ReactNode }) => {
  return (
    <tr className="border-b">
      {children}
    </tr>
  );
};

export const TableCell = ({
  value
}: {

  value: string | number;
}) => {
  return (
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r" >{value}</td>
  );
};