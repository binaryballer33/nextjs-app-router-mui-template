"use client"

import type { YuGiOhCard } from "@/types/yu-gi-oh/yu-gi-oh"

import CustomTable from "@/components/tables/table"

import useCreateTableColumns from "./use-create-yugioh-table-columns"

type YugiohTableProps = {
    yugiohCards: YuGiOhCard[]
}

export default function YugiohTable(props: YugiohTableProps) {
    const { yugiohCards } = props

    const { columns, hideForColumns } = useCreateTableColumns()

    return (
        <CustomTable
            columns={columns}
            data={yugiohCards}
            hideForColumns={hideForColumns}
            recordsPerPage={[10, 20, 30, 40, 50, 100]}
            width="100%"
        />
    )
}
