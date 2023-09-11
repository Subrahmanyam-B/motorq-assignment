import { Button } from '../ui/button';
import { Table, tableDataType } from '../ui/table';
import { createColumnHelper } from '@tanstack/react-table';
import axios from 'axios';
import {redirect} from 'next/navigation';

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
  isAdmin,
}: {
  data: tableDataType[];
  loadMore?: () => void;
  loadMoreDisable?: boolean;
  handleRowClick: (data: tableDataType) => void;
  updateData: (res: IUpdateCustomerType) => void;
  isAdmin?: boolean;
}) {
  function handleCustomerUpdate({ id, type, bool, ind }: IUpdateCustomerType) {

  }

  const accept = async (id: string) => {
    try {
      await axios.put(`/api/enrollments?id=${id}`, { status: 'accepted' })
      redirect('/enrollments');
    } catch (error) {
      console.error(error);
    }
  };

  const reject = async (id: string) => {
    try {
      await axios.put(`/api/enrollments?id=${id}`, { status: 'rejected' });
      redirect('/enrollments');
    } catch (error) {
      console.error(error);
    }
  };

  const columns: any = [
    columnHelper.accessor('vehicle.VIN', {
      cell: (info) => <span>{info.getValue()}</span>,
      header: () => <span>VIN</span>,
    }),
    columnHelper.accessor('vehicle.Make', {
      header: () => 'Make',
      cell: (info) => <span>{info.renderValue()}</span>,
    }),
    columnHelper.accessor('vehicle.Model', {
      header: () => <span>Model</span>,
      cell: (info) => <span>{info.renderValue() || '-'}</span>,
    }),
    columnHelper.accessor('vehicle.Year', {
      header: () => 'Year',
      cell: (info) => <span>{info.renderValue() || '0'}</span>,
    }),
    columnHelper.accessor('status', {
      header: () => 'Status',
      cell: (info) => <span>{info.renderValue() || '0'}</span>,
    }),
    ...(isAdmin
      ? [
          columnHelper.accessor('', {
            id: 'isEmailSubscribe',
            // header: () => 'Text Subscribe',
            cell: (info) => <Button onClick={() => accept(info.row.original.id)}>Accept</Button>,
          }),
          columnHelper.accessor('', {
            id: 'isEmailSubscribe',
            // header: () => 'E-mail Subscribe',
            cell: (info) => <Button onClick={() => reject(info.row.original.id)}>Reject</Button>,
          }),
        ]
      : []),
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
