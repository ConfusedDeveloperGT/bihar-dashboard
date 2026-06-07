"use client";

import React, { useState } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

type ConstituencyResult = {
  id: string;
  name: string;
  district: string;
  winner: string;
  winnerParty: string;
  margin: number;
  status: 'Retained' | 'Gained' | 'Lost';
};

// Mock data for the table until we build the full dataset
const mockData: React.SetStateAction<ConstituencyResult[]> = [
  { id: '1', name: 'Patna Sahib', district: 'Patna', winner: 'Nand Kishore Yadav', winnerParty: 'BJP', margin: 42000, status: 'Retained' },
  { id: '2', name: 'Kumhrar', district: 'Patna', winner: 'Arun Kumar Sinha', winnerParty: 'BJP', margin: 26000, status: 'Retained' },
  { id: '3', name: 'Danapur', district: 'Patna', winner: 'Ritlal Yadav', winnerParty: 'RJD', margin: 15000, status: 'Gained' },
  { id: '4', name: 'Raghopur', district: 'Vaishali', winner: 'Tejashwi Yadav', winnerParty: 'RJD', margin: 38000, status: 'Retained' },
  { id: '5', name: 'Hasanpur', district: 'Samastipur', winner: 'Tej Pratap Yadav', winnerParty: 'RJD', margin: 21000, status: 'Retained' },
  { id: '6', name: 'Nalanda', district: 'Nalanda', winner: 'Shrawan Kumar', winnerParty: 'JDU', margin: 16000, status: 'Retained' },
];

const columnHelper = createColumnHelper<ConstituencyResult>();

const columns = [
  columnHelper.accessor('name', {
    header: 'Constituency',
    cell: info => <span className="font-medium text-primary">{info.getValue()}</span>,
  }),
  columnHelper.accessor('district', {
    header: 'District',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('winnerParty', {
    header: 'Winning Party',
    cell: info => {
      const party = info.getValue();
      const color = party === 'BJP' ? '#FF6B00' : party === 'RJD' ? '#008000' : party === 'JDU' ? '#003366' : '#888';
      return (
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }}></div>
          <span className="font-medium" style={{ color }}>{party}</span>
        </div>
      );
    },
  }),
  columnHelper.accessor('winner', {
    header: 'Winner Candidate',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('margin', {
    header: 'Margin',
    cell: info => <span className="text-secondary">{info.getValue().toLocaleString()}</span>,
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: info => {
      const status = info.getValue();
      return (
        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
          status === 'Retained' ? 'bg-blue-500/10 text-blue-500' :
          status === 'Gained' ? 'bg-green-500/10 text-green-500' :
          'bg-red-500/10 text-red-500'
        }`}>
          {status}
        </span>
      );
    },
  }),
];

const ElectionTable = () => {
  const [data, setData] = useState(() => mockData);
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: data as ConstituencyResult[],
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full text-left border-collapse">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} className="border-b border-primary bg-surface/50">
              {headerGroup.headers.map(header => (
                <th 
                  key={header.id} 
                  className="px-4 py-3 text-sm font-medium text-secondary uppercase tracking-wider cursor-pointer hover:bg-elevated transition-colors"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  <div className="flex items-center gap-1">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    <span className="text-tertiary">
                      {{
                        asc: <ArrowUp size={14} />,
                        desc: <ArrowDown size={14} />,
                      }[header.column.getIsSorted() as string] ?? <ArrowUpDown size={14} className="opacity-50" />}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="border-b border-subtle hover:bg-elevated transition-colors">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="px-4 py-3 text-sm">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ElectionTable;
