import * as React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

const defaultData = [
  {
    id: 2,
    pubkey: 'In Relationship',
    influence: 50,
  },
  {
    id: 3,
    pubkey: 'In Relationship',
    influence: 50,
  },
  {
    id: 4,
    pubkey: 'In Relationship',
    influence: 50,
  },
]

const columnHelper = createColumnHelper()

const columns = [
  columnHelper.accessor((row) => row.id, {
    id: 'id',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>ID</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.pubkey, {
    id: 'pubkey',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>pubkey</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.influence, {
    id: 'influence',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>influence</span>,
    footer: (info) => info.column.id,
  }),
]

const TestPageBody = () => {
  const [data, _setData] = React.useState(() => [...defaultData])
  const rerender = React.useReducer(() => ({}), {})[1]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="p-2">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.footer, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <div className="h-4" />
      <button onClick={() => rerender()} className="border p-2">
        Rerender
      </button>
    </div>
  )
}

export default TestPageBody
