import type { ReactNode } from "react"

import Box from "@mui/material/Box"
import type { CheckboxProps } from "@mui/material/Checkbox"
import Checkbox from "@mui/material/Checkbox"
import type { ChipProps } from "@mui/material/Chip"
import Chip from "@mui/material/Chip"
import type { FormControlProps } from "@mui/material/FormControl"
import FormControl from "@mui/material/FormControl"
import type { FormHelperTextProps } from "@mui/material/FormHelperText"
import FormHelperText from "@mui/material/FormHelperText"
import type { InputLabelProps } from "@mui/material/InputLabel"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import type { SelectProps } from "@mui/material/Select"
import Select from "@mui/material/Select"
import type { SxProps, Theme } from "@mui/material/styles"
import type { TextFieldProps } from "@mui/material/TextField"
import TextField from "@mui/material/TextField"
import { Controller, useFormContext } from "react-hook-form"

type RHFSelectProps = TextFieldProps & {
    name: string
    native?: boolean
    children: ReactNode
    slotProps?: {
        paper?: SxProps<Theme>
    }
}

export default function RHFSelect({
    name,
    native,
    children,
    slotProps,
    helperText,
    inputProps,
    InputLabelProps,
    ...other
}: RHFSelectProps) {
    const { control } = useFormContext()

    const labelId = `${name}-select-label`

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <TextField
                    {...field}
                    select
                    fullWidth
                    SelectProps={{
                        native,
                        MenuProps: { PaperProps: { sx: { maxHeight: 220, ...slotProps?.paper } } },
                        sx: { textTransform: "capitalize" },
                    }}
                    InputLabelProps={{ htmlFor: labelId, ...InputLabelProps }}
                    inputProps={{ id: labelId, ...inputProps }}
                    error={!!error}
                    helperText={error ? error?.message : helperText}
                    {...other}
                >
                    {children}
                </TextField>
            )}
        />
    )
}

// ----------------------------------------------------------------------

type RHFMultiSelectProps = FormControlProps & {
    name: string
    label?: string
    chip?: boolean
    checkbox?: boolean
    placeholder?: string
    helperText?: ReactNode
    options: {
        label: string
        value: string
    }[]
    slotProps?: {
        chip?: ChipProps
        select: SelectProps
        checkbox?: CheckboxProps
        inputLabel?: InputLabelProps
        formHelperText?: FormHelperTextProps
    }
}

export function RHFMultiSelect({
    name,
    chip,
    label,
    options,
    checkbox,
    placeholder,
    slotProps,
    helperText,
    ...other
}: RHFMultiSelectProps) {
    const { control } = useFormContext()

    const labelId = `${name}-select-label`

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <FormControl error={!!error} {...other}>
                    {label && (
                        <InputLabel htmlFor={labelId} {...slotProps?.inputLabel}>
                            {label}
                        </InputLabel>
                    )}

                    <Select
                        {...field}
                        multiple
                        displayEmpty={!!placeholder}
                        label={label}
                        renderValue={(selected) => {
                            const selectedItems = options.filter((item) => (selected as string[]).includes(item.value))

                            if (!selectedItems.length && placeholder) {
                                return <Box sx={{ color: "text.disabled" }}>{placeholder}</Box>
                            }

                            if (chip) {
                                return (
                                    <Box sx={{ gap: 0.5, display: "flex", flexWrap: "wrap" }}>
                                        {selectedItems.map((item) => (
                                            <Chip
                                                key={item.value}
                                                size="small"
                                                // @ts-ignore
                                                variant="soft"
                                                label={item.label}
                                                {...slotProps?.chip}
                                            />
                                        ))}
                                    </Box>
                                )
                            }

                            return selectedItems.map((item) => item.label).join(", ")
                        }}
                        {...slotProps?.select}
                        inputProps={{ id: labelId, ...slotProps?.select?.inputProps }}
                    >
                        {options.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {checkbox && (
                                    <Checkbox
                                        size="small"
                                        disableRipple
                                        checked={field.value.includes(option.value)}
                                        {...slotProps?.checkbox}
                                    />
                                )}

                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>

                    {(!!error || helperText) && (
                        <FormHelperText error={!!error} {...slotProps?.formHelperText}>
                            {error ? error?.message : helperText}
                        </FormHelperText>
                    )}
                </FormControl>
            )}
        />
    )
}
