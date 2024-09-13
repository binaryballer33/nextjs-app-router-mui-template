import type { CheckboxProps } from "@mui/material/Checkbox"
import type { FormControlLabelProps } from "@mui/material/FormControlLabel"
import type { FormGroupProps } from "@mui/material/FormGroup"
import type { FormHelperTextProps } from "@mui/material/FormHelperText"
import type { FormLabelProps } from "@mui/material/FormLabel"
import type { SxProps, Theme } from "@mui/material/styles"

import { Controller, useFormContext } from "react-hook-form"

import Box from "@mui/material/Box"
import Checkbox from "@mui/material/Checkbox"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import FormHelperText from "@mui/material/FormHelperText"
import FormLabel from "@mui/material/FormLabel"

// ----------------------------------------------------------------------

type RHFCheckboxProps = {
    helperText?: React.ReactNode
    name: string
    slotProps?: {
        checkbox?: CheckboxProps
        formHelperText?: FormHelperTextProps
        wrap?: SxProps<Theme>
    }
} & Omit<FormControlLabelProps, "control">

export default function RHFCheckbox({ helperText, label, name, slotProps, ...other }: RHFCheckboxProps) {
    const { control } = useFormContext()

    const ariaLabel = `Checkbox ${name}`

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
                <Box sx={slotProps?.wrap}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                {...field}
                                checked={field.value}
                                {...slotProps?.checkbox}
                                inputProps={{
                                    ...(!label && { "aria-label": ariaLabel }),
                                    ...slotProps?.checkbox?.inputProps,
                                }}
                            />
                        }
                        label={label}
                        {...other}
                    />

                    {(!!error || helperText) && (
                        <FormHelperText error={!!error} {...slotProps?.formHelperText}>
                            {error ? error?.message : helperText}
                        </FormHelperText>
                    )}
                </Box>
            )}
        />
    )
}

// ----------------------------------------------------------------------

type RHFMultiCheckboxProps = {
    helperText?: React.ReactNode
    label?: string
    name: string
    options: {
        label: string
        value: string
    }[]
    slotProps?: {
        checkbox?: CheckboxProps
        formHelperText?: FormHelperTextProps
        formLabel?: FormLabelProps
        wrap?: SxProps<Theme>
    }
} & FormGroupProps

export function RHFMultiCheckbox({ helperText, label, name, options, slotProps, ...other }: RHFMultiCheckboxProps) {
    const { control } = useFormContext()

    const getSelected = (selectedItems: string[], item: string) =>
        selectedItems.includes(item) ? selectedItems.filter((value) => value !== item) : [...selectedItems, item]

    const accessibility = (val: string) => val
    const ariaLabel = (val: string) => `Checkbox ${val}`

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
                <FormControl component="fieldset" sx={slotProps?.wrap}>
                    {label && (
                        <FormLabel
                            component="legend"
                            {...slotProps?.formLabel}
                            sx={{ mb: 1, typography: "body2", ...slotProps?.formLabel?.sx }}
                        >
                            {label}
                        </FormLabel>
                    )}

                    <FormGroup {...other}>
                        {options.map((option) => (
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={field.value.includes(option.value)}
                                        name={accessibility(option.label)}
                                        onChange={() => field.onChange(getSelected(field.value, option.value))}
                                        {...slotProps?.checkbox}
                                        inputProps={{
                                            ...(!option.label && { "aria-label": ariaLabel(option.label) }),
                                            ...slotProps?.checkbox?.inputProps,
                                        }}
                                    />
                                }
                                key={option.value}
                                label={option.label}
                            />
                        ))}
                    </FormGroup>

                    {(!!error || helperText) && (
                        <FormHelperText error={!!error} sx={{ mx: 0 }} {...slotProps?.formHelperText}>
                            {error ? error?.message : helperText}
                        </FormHelperText>
                    )}
                </FormControl>
            )}
        />
    )
}
