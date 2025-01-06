import * as React from 'react'
import { useNewEvent, useSigner } from 'nostr-hooks'

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
import { CButton, CFormSwitch, CNavLink } from '@coreui/react'
import { useProfile } from 'nostr-hooks'
import { noProfilePicUrl } from 'src/const'
import { nip19 } from 'nostr-tools'
import { safeNpubEncode } from '../../../../helpers/nip19'

const columnHelper = createColumnHelper()

const ProfileImageCell = ({ pubkey }) => {
  const params = React.useMemo(() => ({ pubkey }), [])
  const { profile } = useProfile(params)
  const href = '#/profile?pubkey=' + pubkey
  const picUrl = profile?.image || noProfilePicUrl
  // console.log(`ProfileImageCell ${pubkey}`)
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

const ProfileNpub = ({ pubkey }) => {
  return safeNpubEncode(pubkey)
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
  columnHelper.accessor((row) => row.pubkey, {
    id: 'npub',
    cell: (info) => <ProfileNpub pubkey={info.getValue()} />,
    header: () => <span>npub</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.pubkey, {
    id: 'picture',
    cell: (info) => <ProfileImageCell pubkey={info.getValue()} />,
    header: () => (
      <span>
        <center>pic</center>
      </span>
    ),
    footer: (info) => info.column.id,
    enableColumnFilter: false,
  }),
  columnHelper.accessor((row) => row.pubkey, {
    id: 'displayName',
    cell: (info) => <ProfileDisplayName pubkey={info.getValue()} />,
    header: () => (
      <span>
        <center>display name</center>
      </span>
    ),
    footer: (info) => info.column.id,
    enableColumnFilter: false,
  }),
  columnHelper.accessor((row) => row.influence, {
    id: 'influence',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => (
      <span>
        <center>
          GrapeRank (context: <i>not spam</i>)
        </center>
      </span>
    ),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.personalizedPageRank, {
    id: 'personalizedPageRank',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => (
      <span>
        <center>PageRank</center>
      </span>
    ),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.degreeOfSeparation, {
    id: 'degreeOfSeparation',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => (
      <span>
        <center>hops</center>
      </span>
    ),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.logPersonalizedPageRank, {
    id: 'logPersonalizedPageRank',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>log PageRank</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.average, {
    id: 'average',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>GrapeRank: Average</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.confidence, {
    id: 'confidence',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>GrapeRank: Confidence</span>,
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

const TanstackTable = ({ defaultData, tableConfig }) => {
  const [numPubkeys, setNumPubkeys] = React.useState(3000)
  const [data, _setData] = React.useState(() => [...defaultData])

  const [columnVisibility, setColumnVisibility] = React.useState({
    id: false,
    pubkey: false,
    npub: false,
    picture: true,
    displayName: true,
    influence: true,
    personalizedPageRank: true,
    degreeOfSeparation: true,
    logPersonalizedPageRank: false,
    average: false,
    confidence: false,
  })

  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 25,
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

  const totalRowsCore = table.getCoreRowModel().rows.length
  const totalRowsFiltered = table.getFilteredRowModel().rows.length
  const totalRowsPrePagination = table.getPrePaginationRowModel().rows.length

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

  const [showTableInfoButton, setShowTableInfoButton] = React.useState('hide')
  const toggleShowTableInfo = React.useCallback(
    (e) => {
      if (showTableInfoButton == 'hide') {
        setShowTableInfoButton('show')
      }
      if (showTableInfoButton == 'show') {
        setShowTableInfoButton('hide')
      }
    },
    [showTableInfoButton],
  )

  const { createNewEvent } = useNewEvent()
  const { signer } = useSigner()
  const makeNip51List = () => {
    const event = createNewEvent()
    event.kind = 30000

    const aRows = table.getFilteredRowModel().rows
    const aTags = [
      ['P', 'tapestry'],
      ['wordType', 'influenceScoresList'],
      ['w', 'influenceScoresList'],
      [
        'description',
        'a list of nostr npubs and their associated Grapevine WoT Scores as calculated by the Tapestry Protocol',
      ],
    ]
    const dTag = ['d', 'influenceScoresList_' + numPubkeys]
    const titleTag = ['title', 'My Grapevine Recommended (GrapeRank ' + numPubkeys + ')']
    aTags.push(dTag)
    aTags.push(titleTag)
    for (let x = 0; x < Math.min(aRows.length, numPubkeys); x++) {
      const oNextRow = aRows[x]
      const pk = oNextRow.original.pubkey
      const influence = oNextRow.original.influence
      const personalizedPageRank = oNextRow.original.personalizedPageRank
      const degreeOfSeparation = oNextRow.original.degreeOfSeparation

      const aNextTag = ['p', pk, degreeOfSeparation, personalizedPageRank, influence]
      aTags.push(aNextTag)
    }
    event.tags = aTags
    signer.sign(event)
    console.log('event: ' + JSON.stringify(event, null, 4))
    event.publish()
  }

  return (
    <>
      <div>
        <CFormSwitch
          onChange={(e) => toggleShowTableInfo(e)}
          label="toggle table information"
          id="formSwitchShowInfo"
        />
        <div
          className={showTableInfoButton}
          style={{
            marginBottom: '10px',
            border: '1px solid grey',
            padding: '10px',
            borderRadius: '5px',
          }}
        >
          Say goodbye to global scores.{' '}
          <i>
            You are always at the center of your Grapevine, which means that all scores in the table
            below are relative to YOU, determined from YOUR perspective.
          </i>
          <li>
            <b>hops:</b> the minimum number of follow connections to get from you to the indicated
            profile
          </li>
          <li>
            <b>PageRank:</b> the centrality score that put Google on the map. Designed for the fiat
            world. Calculated using follows. Makes use of the open source{' '}
            <a
              target="_blank"
              href="https://neo4j.com/docs/graph-data-science/current/algorithms/page-rank/"
              rel="noreferrer"
            >
              neo4j Graph Data Science PageRank algorithm
            </a>
            .
          </li>
          <li>
            <b>GrapeRank:</b> centrality score designed to serve the needs of the sovereign
            individual, not the wannabe fiat overlords. Pioneered by{' '}
            <a target="_blank" href="https://pgf.tech" rel="noreferrer">
              Pretty Good Freedom Technology
            </a>
            . Calculated below for the <i>not spam</i> context using follows and mutes, but via the
            process of <i>interpretation</i>, capable of calculating scores for any desired context,
            incorporating an unlimited number of sources of data: reports, zaps, reactions, badges,
            labels, etc.
          </li>
        </div>
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
        <div>{totalRowsPrePagination} rows displayed</div>
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
      <div style={{ display: tableConfig.displayPublishButton }}>
        <CButton color="primary" onClick={() => makeNip51List()}>
          publish list to nostr!
        </CButton>
        <div>
          Create a NIP-51 list composed of the top{' '}
          <input type="text" value={numPubkeys} onChange={(e) => setNumPubkeys(e.target.value)} />{' '}
          pubkeys that are currently depicted in the table below, as filtered and sorted. (Currently
          outputs to console in addition to publish; although be aware, most relays will not accept
          a list over about 800 or 900 pubkeys.)
        </div>
      </div>
    </>
  )
}

export default TanstackTable
