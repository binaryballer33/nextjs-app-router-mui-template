import type { Trade } from "@/types/finance/trade"
import type { Header } from "@tanstack/react-table"

import { MoreVertical } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type TableHeaderDropdownMenuProps = {
    header: Header<Trade, any>
}

export default function TableHeaderDropdownMenu(props: TableHeaderDropdownMenuProps) {
    const { header } = props

    const isPinned = header.column.getIsPinned()
    const isSorted = header.column.getIsSorted()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost">
                    <MoreVertical className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                {/* Pin to right */}
                {isPinned !== "right" && (
                    <DropdownMenuItem onClick={() => header.column.pin("right")}>Pin to Right</DropdownMenuItem>
                )}

                {/* Pin to left */}
                {isPinned !== "left" && (
                    <DropdownMenuItem onClick={() => header.column.pin("left")}>Pin to Left</DropdownMenuItem>
                )}

                {/* Unpin */}
                {isPinned && <DropdownMenuItem onClick={() => header.column.pin(false)}>Unpin</DropdownMenuItem>}

                {/* Sort */}
                <DropdownMenuItem onClick={header.column.getToggleSortingHandler()}>
                    {isSorted === "desc" ? "Sort Asc" : "Sort Desc"}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
