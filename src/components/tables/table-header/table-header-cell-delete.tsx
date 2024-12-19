import type { Trade } from "@/types/finance/trade"
import type { Row, Table } from "@tanstack/react-table"

import { Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"

type TableHeaderCellDeleteProps = {
    row: Row<Trade>
    table: Table<Trade>
}

export default function TableHeaderCellDelete(props: TableHeaderCellDeleteProps) {
    const { row, table } = props

    return (
        <div className="flex items-center justify-center">
            <Button
                className="h-8 w-8 text-destructive hover:text-destructive/90"
                onClick={() => table.options.meta?.removeRow(row.id)}
                size="icon"
                variant="ghost"
            >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete row</span>
            </Button>
        </div>
    )
}