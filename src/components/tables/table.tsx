"use client"

import type { Trade } from "@/types/finance/trade"
import type { DragEndEvent } from "@dnd-kit/core"

import { Fragment } from "react"

import {
    closestCenter,
    DndContext,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core"
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers"
import { arrayMove, horizontalListSortingStrategy, SortableContext } from "@dnd-kit/sortable"
import { useReactTable } from "@tanstack/react-table"

import { Table, TableBody, TableHeader, TableRow } from "@/components/ui/table"

import TableBodyCell from "./table-body-cell"
import TableBodyDeleteIcon from "./table-body-delete-icon"
import TableBodyDetailView from "./table-body-detail-view"
import TableBodyNoRecordsFound from "./table-body-no-records-found"
import TableHeaderExportButtons from "./table-export-buttons"
import TableFooter from "./table-footer"
import TableGlobalSearchBar from "./table-global-search-bar"
import TableHeaderCell from "./table-header-cell"
import TableHeaderColumnVisibilitySelector from "./table-header-column-visibility-selector"
import TablePagination from "./table-pagination"
import TableRecordsPerPage from "./table-records-per-page"
import useTableData from "./use-create-table"

// TODO: dropdown column menu needs to have more detailed filtering options ( ge, lt, gte, lte, eq, neq, contains, not contains, etc.)
// TODO: add a "create new trade button"
// TODO: row reordering
// TODO: make the table header sticky
// TODO: figure out how to make the entire header surface area a tooltip trigger so when hovering over the header cell, the tooltip is visible and when hovering the header title disspears and only the icons and tooltip are visible
export default function CustomTable() {
    const { columnIds, columnOrder, setColumnOrder, setData, tableConfig } = useTableData()
    const table = useReactTable<Trade>(tableConfig)

    // reorder columns after drag & drop
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event
        if (active && over && active.id !== over.id) {
            setColumnOrder((columnOrderPrev) => {
                const oldIndex = columnOrderPrev.indexOf(active.id as string)
                const newIndex = columnOrderPrev.indexOf(over.id as string)
                return arrayMove(columnOrderPrev, oldIndex, newIndex) // this is just a splice util
            })
        }
    }

    // sensors for DnD column reordering
    const sensors = useSensors(useSensor(MouseSensor, {}), useSensor(TouchSensor, {}), useSensor(KeyboardSensor, {}))

    return (
        <div className="flex flex-col gap-2 md:p-2">
            {/* Table Controls */}
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                <div className="flex items-center gap-4 md:w-4/6">
                    {table.getIsSomeRowsSelected() || table.getIsAllRowsSelected() ? (
                        <TableBodyDeleteIcon setData={setData} table={table} />
                    ) : (
                        <>
                            <TableHeaderColumnVisibilitySelector columnIds={columnIds} table={table} />
                            <TableHeaderExportButtons table={table} />
                        </>
                    )}

                    <TableGlobalSearchBar table={table} />
                </div>

                {/* Records per page option selector */}
                <TableRecordsPerPage table={table} />
            </div>

            {/* Table */}
            <DndContext
                collisionDetection={closestCenter}
                modifiers={[restrictToHorizontalAxis]}
                onDragEnd={handleDragEnd}
                sensors={sensors}
            >
                <div className="max-h-[525px] min-h-[525px] overflow-x-auto overflow-y-auto rounded-md border">
                    <Table>
                        <TableHeader className="sticky top-0 z-10 bg-background">
                            {/* Table header rows */}
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow className="[&>th]:border-r [&>th]:border-black/10" key={headerGroup.id}>
                                    {/* dnd sortable context for the table header cells */}
                                    <SortableContext items={columnOrder} strategy={horizontalListSortingStrategy}>
                                        {/* Table header cells */}
                                        {headerGroup.headers.map((header) => (
                                            <TableHeaderCell header={header} key={header.id} table={table} />
                                        ))}
                                    </SortableContext>
                                </TableRow>
                            ))}
                        </TableHeader>

                        <TableBody>
                            {/* table body rows */}
                            {table.getRowModel().rows.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <Fragment key={row.id}>
                                        <TableRow
                                            className={`
                                            ${row.index % 2 === 1 ? "bg-black/[.33]" : ""}
                                            ${row.getIsSelected() ? "bg-primary" : ""}
                                            hover:bg-black/[.05]
                                            [&>td]:border-r [&>td]:border-black/10
                                        `}
                                        >
                                            {/* get the table records and display them in the table */}
                                            {row.getVisibleCells().map((cell) => (
                                                // dnd sortable context for the table body cells
                                                <SortableContext
                                                    items={columnOrder}
                                                    key={cell.id}
                                                    strategy={horizontalListSortingStrategy}
                                                >
                                                    <TableBodyCell cell={cell} />
                                                </SortableContext>
                                            ))}
                                        </TableRow>

                                        {/* if the row is expanded, display the row detail view */}
                                        {row.getIsExpanded() && <TableBodyDetailView row={row} trade={row.original} />}
                                    </Fragment>
                                ))
                            ) : (
                                // if no data is found that matches the search, display this message
                                <TableBodyNoRecordsFound table={table} />
                            )}
                        </TableBody>

                        {/* Table footer */}
                        <TableFooter table={table} />
                    </Table>
                </div>
            </DndContext>

            {/* Pagination */}
            <TablePagination table={table} />
        </div>
    )
}
