import * as React from 'react'

import './index.css'

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { CFormSwitch, CNavLink } from '@coreui/react'
import { useProfile } from 'nostr-hooks'
import { noProfilePicUrl } from '../../../../const'

const columnHelper = createColumnHelper()

const ProfileImageCell = ({ pubkey }) => {
  const params = React.useMemo(() => ({ pubkey }), [])
  const { profile } = useProfile(params)
  const href = '#/profile?pubkey=' + pubkey
  const picUrl = profile?.image || noProfilePicUrl
  console.log(`ProfileImageCell ${pubkey}`)
  return (
    <div style={{ textAlign: 'center' }}>
      <div className="profileAvatarContainerSmall">
        <CNavLink href={href}>
          <img src={picUrl} className="profileAvatarSmall" />
        </CNavLink>
      </div>
    </div>
  )
}

const ProfileDisplayName = ({ pubkey }) => {
  const params = React.useMemo(() => ({ pubkey }), [])
  const { profile } = useProfile(params)
  return profile?.displayName
}

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
  columnHelper.accessor((row) => row.npub, {
    id: 'npub',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>npub</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.pubkey, {
    id: 'picture',
    cell: (info) => <ProfileImageCell pubkey={info.getValue()} />,
    header: () => <span>picture</span>,
    footer: (info) => info.column.id,
    enableColumnFilter: false,
  }),
  columnHelper.accessor((row) => row.pubkey, {
    id: 'displayName',
    cell: (info) => <ProfileDisplayName pubkey={info.getValue()} />,
    header: () => <span>displayName</span>,
    footer: (info) => info.column.id,
    enableColumnFilter: false,
  }),
  columnHelper.accessor((row) => row.influence, {
    id: 'influence',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>influence</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.degreeOfSeparation, {
    id: 'degreeOfSeparation',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>DoS</span>,
    footer: (info) => info.column.id,
  }),
]

function Filter({ column, table }) {
  const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id)

  const columnFilterValue = column.getFilterValue()

  return typeof firstValue === 'number' ? (
    <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
      <input
        type="number"
        value={columnFilterValue?.[0] ?? ''}
        onChange={(e) => column.setFilterValue((old) => [e.target.value, old?.[1]])}
        placeholder={`Min`}
        className="w-24 border shadow rounded"
      />
      <input
        type="number"
        value={columnFilterValue?.[1] ?? ''}
        onChange={(e) => column.setFilterValue((old) => [old?.[0], e.target.value])}
        placeholder={`Max`}
        className="w-24 border shadow rounded"
      />
    </div>
  ) : (
    <input
      className="w-36 border shadow rounded"
      onChange={(e) => column.setFilterValue(e.target.value)}
      onClick={(e) => e.stopPropagation()}
      placeholder={`Search...`}
      type="text"
      value={columnFilterValue ?? ''}
    />
  )
}

const TanstackTable = ({ defaultData }) => {
  const [data, _setData] = React.useState(() => [...defaultData])

  const [columnVisibility, setColumnVisibility] = React.useState({
    id: false,
    pubkey: false,
    npub: false,
    picture: true,
    displayName: true,
    influence: true,
    degreeOfSeparation: true,
  })

  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const [columnResizeMode, setColumnResizeMode] = React.useState('onChange')
  const [columnResizeDirection, setColumnResizeDirection] = React.useState('ltr')

  const [sorting, setSorting] = React.useState([{ id: 'influence', desc: true }])

  const table = useReactTable({
    data,
    columns,
    columnResizeMode,
    columnResizeDirection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnVisibility,
      pagination,
      sorting,
    },
    debugTable: false,
    debugHeaders: false,
    debugColumns: false,
  })

  const totalRows = table.getPrePaginationRowModel().rows.length

  const [showColsControlPanelButton, setShowColsControlPanelButton] = React.useState('hide')
  const toggleShowColumnsControlPanel = React.useCallback(
    (e) => {
      if (showColsControlPanelButton == 'hide') {
        setShowColsControlPanelButton('show')
      }
      if (showColsControlPanelButton == 'show') {
        setShowColsControlPanelButton('hide')
      }
    },
    [showColsControlPanelButton],
  )

  return (
    <>
      <div>
        <CFormSwitch
          onChange={(e) => toggleShowColumnsControlPanel(e)}
          label="toggle columns"
          id="formSwitchCheckDefault"
        />
      </div>
      <div className={showColsControlPanelButton}>
        <div style={{ display: 'flex', flexGrow: 'auto' }}>
          <div className="inline-block border border-black shadow rounded">
            <div className="px-1 border-b border-black">
              <label>
                <input
                  {...{
                    type: 'checkbox',
                    checked: table.getIsAllColumnsVisible(),
                    onChange: table.getToggleAllColumnsVisibilityHandler(),
                  }}
                />{' '}
                Toggle All
              </label>
            </div>
            {table.getAllLeafColumns().map((column) => {
              return (
                <div key={column.id} className="px-1" style={{ display: 'flex', flexGrow: 'auto' }}>
                  <label>
                    <input
                      {...{
                        type: 'checkbox',
                        checked: column.getIsVisible(),
                        onChange: column.getToggleVisibilityHandler(),
                      }}
                    />{' '}
                    {column.id}
                  </label>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div>
        <div>{totalRows} rows displayed</div>
      </div>
      <div className="h-4" />
      <div style={{ direction: table.options.columnResizeDirection }}>
        <div className="h-4" />
        <div className="overflow-x-auto">
          <table
            {...{
              style: {
                width: table.getCenterTotalSize(),
              },
            }}
          >
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th key={header.id} colSpan={header.colSpan}>
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? 'cursor-pointer select-none'
                              : '',
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {{
                            asc: ' 🔼',
                            desc: ' 🔽',
                          }[header.column.getIsSorted()] ?? null}
                          {header.column.getCanFilter({}) ? (
                            <div>
                              <Filter column={header.column} table={table} />
                            </div>
                          ) : null}
                        </div>

                        <div
                          {...{
                            onDoubleClick: () => header.column.resetSize(),
                            onMouseDown: header.getResizeHandler(),
                            onTouchStart: header.getResizeHandler(),
                            className: `resizer ${table.options.columnResizeDirection} ${
                              header.column.getIsResizing() ? 'isResizing' : ''
                            }`,
                            style: {
                              transform:
                                columnResizeMode === 'onEnd' && header.column.getIsResizing()
                                  ? `translateX(${
                                      (table.options.columnResizeDirection === 'rtl' ? -1 : 1) *
                                      (table.getState().columnSizingInfo.deltaOffset ?? 0)
                                    }px)`
                                  : '',
                            },
                          }}
                        />
                      </th>
                    )
                  })}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} style={{ width: 'cell.column.getSize()' }}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
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
        </div>
      </div>
      <div className="h-4" />

      <div className="flex items-center gap-2">
        <button
          className="border rounded p-1"
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of {table.getPageCount().toLocaleString()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}

export default TanstackTable