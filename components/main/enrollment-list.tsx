import { Button } from '../ui/button';
import { Table, tableDataType } from '../ui/table';
import { createColumnHelper } from '@tanstack/react-table';

const columnHelper = createColumnHelper<tableDataType>();

export type IUpdateCustomerType = {
  id?: string;
  type: 'isTextSubscribe' | 'isEmailSubscribe';
  bool: boolean;
  ind: number;
};
export function EnrollmentList({
  data,
  loadMore,
  loadMoreDisable,
  handleRowClick,
  updateData,
}: {
  data: tableDataType[];
  loadMore?: () => void;
  loadMoreDisable?: boolean;
  handleRowClick: (data: tableDataType) => void;
  updateData: (res: IUpdateCustomerType) => void;
}) {
  function handleCustomerUpdate({ id, type, bool, ind }: IUpdateCustomerType) {

  }

  const columns: any = [
    columnHelper.accessor('VIN', {
      cell: (info) => <span>{info.getValue()}</span>,
      header: () => <span>VIN</span>,
    }),
    columnHelper.accessor('make', {
      header: () => 'Make',
      cell: (info) => <span>{info.renderValue()}</span>,
    }),
    columnHelper.accessor('model', {
      header: () => <span>Model</span>,
      cell: (info) => <span>{info.renderValue() || '-'}</span>,
    }),
    columnHelper.accessor('year', {
      header: () => 'Year',
      cell: (info) => <span>{info.renderValue() || '0'}</span>,
    }),
    columnHelper.accessor('status', {
      header: () => 'Status',
      cell: (info) => <span>{info.renderValue() || '0'}</span>,
    }),
    columnHelper.accessor('', {
      id: 'isTextSubscribe',
      // header: () => 'Text Subscribe',
      cell: (info) => (
        <Button>Accept</Button>
      ),
    }),
    columnHelper.accessor('', {
      id: 'isEmailSubscribe',
      // header: () => 'E-mail Subscribe',
      cell: (info) => (
<Button>Reject</Button>
      ),
    }),
  ];

  return (
    <div>
      <div className=" mt-10 p-5 bg-white w-full overflow-y-auto rounded-xl">
        <Table data={data} columns={columns} handleRowClick={handleRowClick} />
      </div>
      <div className=" flex justify-center bg-white p-5">
        <Button onClick={loadMore} disabled={loadMoreDisable}>
          Load More
        </Button>
      </div>
    </div>
  );
}
