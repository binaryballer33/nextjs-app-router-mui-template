import type { Trade } from "@/types/finance/trade"
import type { ColumnFilter, FilterOperation } from "@/types/table/filters"
import type { Header } from "@tanstack/react-table"

import { useCallback, useEffect, useRef, useState } from "react"

import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// Define the props for the TableHeaderColumnFilter component
type TableHeaderColumnFilterProps = {
    header: Header<Trade, unknown>
}

// Define the available filter operations
const filterOperations: { label: string; value: FilterOperation }[] = [
    { label: "Greater Than", value: "gt" },
    { label: "Less Than", value: "lt" },
    { label: "Greater Than or Equal", value: "gte" },
    { label: "Less Than or Equal", value: "lte" },
    { label: "Equals", value: "eq" },
    { label: "Not Equals", value: "neq" },
    { label: "Contains", value: "contains" },
    { label: "Does Not Contain", value: "notContains" },
    { label: "After Date", value: "afterDate" },
    { label: "Before Date", value: "beforeDate" },
    { label: "Between Dates", value: "betweenDates" },
]

// TODO: if a column has a filter, the column header should have a filter icon or something to indicate that the column is in a filtered state
// TODO: add a "clear all filters" button
// TODO: figure out a way to still be able to see the column that you are trying to filter when the filter menu opens
// TODO: when pressing enter the filter menu should apply the filter and close
// TODO: put a clear filter option in the filter menu and maybe in the information dropdown menu for setting 3
// TODO:if you are in the filter menu for the date column you should only have options related to dates, before, after, bettween, this rule needs to apply to all columns, they should only have options related to the column type
// TODO: when selecting a date range after selecting the start date the end date should be focused
// TODO: create a DebouncedInput component that debounces the input and only updates the state after a delay
export default function TableHeaderColumnFilter(props: TableHeaderColumnFilterProps) {
    const { header } = props
    const [filterState, setFilterState] = useState({
        endDate: "",
        operation: "contains" as FilterOperation,
        value: "",
    })
    const [open, setOpen] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    // Focus the input when the popover opens
    useEffect(() => {
        if (open) {
            // Small timeout to ensure DOM is ready
            const timeoutId = setTimeout(() => {
                inputRef.current?.focus()
            }, 0)
            return () => clearTimeout(timeoutId)
        }
        return () => clearTimeout(100)
    }, [open])

    // Update the filter state when the component mounts or the header changes
    useEffect(() => {
        const currentFilter = header.column.getFilterValue() as ColumnFilter
        if (currentFilter) {
            setFilterState({
                endDate: currentFilter.endDate || "",
                operation: currentFilter.operation,
                value: String(currentFilter.value),
            })
        }
    }, [header.column])

    const handleFilter = useCallback(() => {
        const { endDate, operation, value } = filterState
        if (!value.trim()) {
            header.column.setFilterValue(null)
            return
        }

        // Create the filter value object
        const filterValue: ColumnFilter = {
            operation,
            value: convertRowValueToAppropriateType(operation, value),
        }

        // Add endDate if the operation is "betweenDates"
        if (operation === "betweenDates" && endDate) {
            filterValue.endDate = endDate
        }

        header.column.setFilterValue(filterValue)
    }, [filterState, header.column])

    // Apply the filter whenever the filterState changes
    useEffect(() => {
        handleFilter()
    }, [filterState, handleFilter])

    // Clear the filter and reset the state
    const clearFilter = () => {
        setFilterState({ endDate: "", operation: "contains", value: "" })
        header.column.setFilterValue(null)
        setOpen(false)
    }

    // Determine if the current operation is a date operation
    const isDateOperation = ["afterDate", "beforeDate", "betweenDates"].includes(filterState.operation)

    // if its a string operation, return the string value, otherwise return the number value
    const convertRowValueToAppropriateType = (filterOperation: FilterOperation, rowValue: string) => {
        if (["afterDate", "beforeDate", "betweenDates", "contains", "notContains"].includes(filterOperation)) {
            return rowValue
        }
        return Number(rowValue)
    }

    return (
        <Popover onOpenChange={setOpen} open={open}>
            <PopoverTrigger asChild>
                <Button className={header.column.getIsFiltered() ? "text-primary" : ""} size="icon" variant="ghost">
                    <Search className="h-4 w-4" />
                    <span className="sr-only">Filter {header.column.id}</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="space-y-4">
                    <h4 className="font-medium leading-none">Filter Based On {header.column.id}</h4>
                    {/* operation selector */}
                    <div className="space-y-2">
                        <RadioGroup
                            className="grid grid-cols-2 gap-2"
                            onValueChange={(valueChange) =>
                                setFilterState((prev) => ({ ...prev, operation: valueChange as FilterOperation }))
                            }
                            value={filterState.operation}
                        >
                            {/* create the filter operations */}
                            {filterOperations.map((op) => (
                                <div className="flex items-center space-x-2" key={op.value}>
                                    <RadioGroupItem id={op.value} value={op.value} />
                                    <Label htmlFor={op.value}>{op.label}</Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>

                    {/* input field for the filter value */}
                    <div className="space-y-2">
                        <Label>{isDateOperation ? "Start Date" : "Value"}</Label>
                        <Input
                            onChange={(e) => setFilterState((prev) => ({ ...prev, value: e.target.value }))}
                            placeholder={isDateOperation ? "Select date..." : "Filter value..."}
                            ref={inputRef}
                            type={
                                isDateOperation
                                    ? "date"
                                    : typeof convertRowValueToAppropriateType(filterState.operation, filterState.value)
                            }
                            value={filterState.value}
                        />
                    </div>

                    {/* input field for the optional end date */}
                    {filterState.operation === "betweenDates" && (
                        <div className="space-y-2">
                            <Label>End Date</Label>
                            <Input
                                onChange={(e) => setFilterState((prev) => ({ ...prev, endDate: e.target.value }))}
                                placeholder="Select end date..."
                                type="date"
                                value={filterState.endDate}
                            />
                        </div>
                    )}

                    {/* buttons for clearing and applying the filter */}
                    <div className="flex justify-between">
                        <Button onClick={clearFilter} variant="outline">
                            Clear
                        </Button>
                        <Button onClick={handleFilter}>Apply Filter</Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
