import { ChangeEvent, useState } from "react"

export default function usePagination(initialPage = 0, initialLimit = 10) {
    const [page, setPage] = useState<number>(initialPage)
    const [limit, setLimit] = useState<number>(initialLimit)

    const handlePageChange = (_event: any, newPage: number): void => {
        setPage(newPage)
    }

    const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setLimit(parseInt(event.target.value, 10))
    }

    /* call this on the data that you want to paginate in order to get the paginated data */
    const paginate = (records: any[], page: number, limit: number): any[] => {
        const firstRecord = page * limit
        const lastRecord = Math.min(page * limit + limit, records.length)
        return records.slice(firstRecord, lastRecord)
    }

    return {
        page,
        limit,
        handlePageChange,
        handleLimitChange,
        paginate,
    }
}
