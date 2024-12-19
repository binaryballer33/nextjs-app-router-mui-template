import type { Trade } from "@/types/finance/trade"
import type { Row } from "@tanstack/react-table"

import { Checkbox } from "@/components/ui/checkbox"

type TableBodyRowCheckboxProps = {
    row: Row<Trade>
}

export default function TableBodyRowCheckbox(props: TableBodyRowCheckboxProps) {
    const { row } = props

    return (
        <div className="flex items-center justify-center">
            <Checkbox checked={row.getIsSelected()} onCheckedChange={(checked) => row.toggleSelected(!!checked)} />
        </div>
    )
}