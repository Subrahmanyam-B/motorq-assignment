import { flexRender, getCoreRowModel, useReactTable, Column } from '@tanstack/react-table';

export type tableDataType = { [key: string]: any };

export function Table({
  data,
  columns,
  handleRowClick,
}: {
  data: tableDataType[];
  columns: Column<tableDataType>[];
  handleRowClick?: (obj: tableDataType) => void;
}) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-2">
      <table className="table-auto min-w-full overflow-x-scroll">
        <thead className=" bg-gray-100 sticky top-0 rounded-lg">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="text-center text-sm font-bold text-gray-800 py-3 px-2">
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} onClick={() => handleRowClick?.(row.original)}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="text-center text-sm font-medium text-black py-7 px-2 cursor-pointer">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
