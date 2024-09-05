import Box from "@mui/material/Box"
import type { CheckboxProps } from "@mui/material/Checkbox"
import Checkbox from "@mui/material/Checkbox"
import FormControl from "@mui/material/FormControl"
import type { FormControlLabelProps } from "@mui/material/FormControlLabel"
import FormControlLabel from "@mui/material/FormControlLabel"
import type { FormGroupProps } from "@mui/material/FormGroup"
import FormGroup from "@mui/material/FormGroup"
import type { FormHelperTextProps } from "@mui/material/FormHelperText"
import FormHelperText from "@mui/material/FormHelperText"
import type { FormLabelProps } from "@mui/material/FormLabel"
import FormLabel from "@mui/material/FormLabel"
import type { SxProps, Theme } from "@mui/material/styles"
import { Controller, useFormContext } from "react-hook-form"

// ----------------------------------------------------------------------

type RHFCheckboxProps = Omit<FormControlLabelProps, "control"> & {
    name: string
    helperText?: React.ReactNode
    slotProps?: {
        wrap?: SxProps<Theme>
        checkbox?: CheckboxProps
        formHelperText?: FormHelperTextProps
    }
}

export default function RHFCheckbox({ name, helperText, label, slotProps, ...other }: RHFCheckboxProps) {
    const { control } = useFormContext()

    const ariaLabel = `Checkbox ${name}`

    return (
        <Controller
            name={name}
            control={control}
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

type RHFMultiCheckboxProps = FormGroupProps & {
    name: string
    label?: string
    helperText?: React.ReactNode
    slotProps?: {
        wrap?: SxProps<Theme>
        checkbox?: CheckboxProps
        formLabel?: FormLabelProps
        formHelperText?: FormHelperTextProps
    }
    options: {
        label: string
        value: string
    }[]
}

export function RHFMultiCheckbox({ name, label, options, slotProps, helperText, ...other }: RHFMultiCheckboxProps) {
    const { control } = useFormContext()

    const getSelected = (selectedItems: string[], item: string) =>
        selectedItems.includes(item) ? selectedItems.filter((value) => value !== item) : [...selectedItems, item]

    const accessibility = (val: string) => val
    const ariaLabel = (val: string) => `Checkbox ${val}`

    return (
        <Controller
            name={name}
            control={control}
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
                                key={option.value}
                                control={
                                    <Checkbox
                                        checked={field.value.includes(option.value)}
                                        onChange={() => field.onChange(getSelected(field.value, option.value))}
                                        name={accessibility(option.label)}
                                        {...slotProps?.checkbox}
                                        inputProps={{
                                            ...(!option.label && { "aria-label": ariaLabel(option.label) }),
                                            ...slotProps?.checkbox?.inputProps,
                                        }}
                                    />
                                }
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
