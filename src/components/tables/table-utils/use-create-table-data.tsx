"use client"

import type { DragEndEvent } from "@dnd-kit/core"
import type { ColumnDef, RowData, TableOptions } from "@tanstack/react-table"

import { useState } from "react"

import { KeyboardSensor, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core"
import { arrayMove } from "@dnd-kit/sortable"
import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel } from "@tanstack/react-table"

import customFilter from "./filters/custom-filter/custom-filter"
import fuzzyFilter from "./filters/fuzzy-filter"

// Extend TanStack's TableMeta interface
declare module "@tanstack/table-core" {
    interface TableMeta<TData extends RowData> {
        height: string
        padding: "lg" | "md" | "sm" | "xl"
        removeRow: (rowId: string) => void
        removeRows: (rowIds: string[]) => void
        setTablePadding: (padding: "lg" | "md" | "sm" | "xl") => void
        width: string
    }
}

type UseCreateTableDataProps<T> = {
    columns: ColumnDef<T>[]
    data: T[]
    height?: string
    width?: string
}

export default function useCreateTableData<T>(props: UseCreateTableDataProps<T>) {
    const { columns, data: initialData, height = "500px", width = "100%" } = props

    // get table row data
    const [data, setData] = useState(initialData)

    // get the columnIds for column visibility toggling
    const [columnOrder, setColumnOrder] = useState<string[]>(() => columns.map((column) => column.id!))

    // row order for dnd row reordering
    const [rowOrder, setRowOrder] = useState<string[]>(() => data.map((_, index) => index.toString()))

    const [tablePadding, setTablePadding] = useState<"lg" | "md" | "sm" | "xl">("md")

    // sensors for dnd column reordering
    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 200,
                tolerance: 5,
            },
        }),
        useSensor(KeyboardSensor),
    )

    // reorder row / column after using dnd
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event

        if (!active || !over || active.id === over.id) return

        // check if the active item is a column or a row by checking the type that was assigned using the useSortable hook
        const isColumn = active.data.current?.type === "column"
        const isRow = active.data.current?.type === "row"

        if (isColumn) {
            const oldIndex = columnOrder.indexOf(active.id.toString())
            const newIndex = columnOrder.indexOf(over.id.toString())

            // arrayMove is a function that moves an item in an array to a new index, fancy splice from dnd-kit
            setColumnOrder(arrayMove(columnOrder, oldIndex, newIndex))
        } else if (isRow) {
            const oldIndex = rowOrder.indexOf(active.id.toString())
            const newIndex = rowOrder.indexOf(over.id.toString())

            // arrayMove is a function that moves an item in an array to a new index, fancy splice from dnd-kit
            setData(arrayMove(data, oldIndex, newIndex))
            setRowOrder(arrayMove(rowOrder, oldIndex, newIndex))
        }
    }

    // create the table config
    const tableConfig: TableOptions<T> = {
        columnResizeDirection: "ltr",
        columnResizeMode: "onChange",
        columns,

        data,

        enableRowSelection: true,

        filterFns: {
            advanced: customFilter,
            fuzzy: fuzzyFilter,
        },

        getCoreRowModel: getCoreRowModel(),

        // filtering for the table
        getFilteredRowModel: getFilteredRowModel(),

        // pagination for the table
        getPaginationRowModel: getPaginationRowModel(),

        // expand button for rows
        getRowCanExpand: () => true,

        // get the row id for the table, helps with smooth row reordering with dnd, without it, row dnd is more choppy
        getRowId: (_, index) => index.toString(),

        // sorting for the table
        getSortedRowModel: getSortedRowModel(),

        // global filter for the table
        globalFilterFn: fuzzyFilter,

        // handle row state deletion
        meta: {
            height, // height of the table
            padding: tablePadding, // padding of the table
            removeRow: (rowId: string) => {
                setData((prev) => prev.filter((_, index) => index.toString() !== rowId))
            },
            removeRows: (rowIds: string[]) => {
                setData((prev) => prev.filter((_, index) => !rowIds.includes(index.toString())))
            },
            setTablePadding: (padding: "lg" | "md" | "sm" | "xl") => {
                setTablePadding(padding)
            },
            width, // width of the table
        },

        // update the column order for dnd column reordering
        onColumnOrderChange: setColumnOrder,

        state: {
            columnOrder,
        },
    }

    return { columnOrder, columns, data, handleDragEnd, rowOrder, sensors, tableConfig }
}
