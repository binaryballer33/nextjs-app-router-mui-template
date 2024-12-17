import type { Trade } from "@/types/finance/trade"
import type { Table } from "@tanstack/react-table"

import { Info } from "lucide-react"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

import TableExtraDropdownPaddingSettings from "./table-extra-dropdown-padding-settings"

type TableExtraDropdownSettingsProps = {
    table: Table<Trade>
}

export default function TableExtraDropdownMenuSettings(props: TableExtraDropdownSettingsProps) {
    const { table } = props

    return (
        <NavigationMenu className="z-50 w-auto hover:border-b-2 hover:border-primary">
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="max-sm:!p-0">
                        <Info className="h-6 w-6 max-sm:!w-4" />
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="min-w-[120px] p-4">
                        <div className="flex flex-col items-center gap-2">
                            <TableExtraDropdownPaddingSettings table={table} />
                            <p>Setting 2</p>
                            <p>Setting 3</p>
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}
