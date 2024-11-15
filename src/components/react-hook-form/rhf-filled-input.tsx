import type { FilledInputProps } from "@mui/material"
import type { ReactNode } from "react"

import { Controller, useFormContext } from "react-hook-form"

import ClearIcon from "@mui/icons-material/Clear"

import { FilledInput, FormControl, FormHelperText, IconButton, InputAdornment, Tooltip } from "@mui/material"
import FormLabel from "@mui/material/FormLabel"

import { useBoolean } from "src/hooks/use-boolean"

import FlexBetweenContainer from "src/components/base/flex-box/flex-between-container"
import FormFieldVisibilityIcon from "src/components/react-hook-form/form/form-field-visibility-icon"

type Props = {
    label: string
    name: string
    padding?: number
    placeholder?: string
    showVisibilityButtons?: boolean
    startAdornment?: ReactNode
} & FilledInputProps

export default function RHFFilledInput(props: Props) {
    const { label, name, padding, placeholder, showVisibilityButtons, startAdornment, type, ...other } = props

    const { control, setValue, watch } = useFormContext()
    const { handleToggle: isFieldVisibleToggle, value: isFieldVisible } = useBoolean()

    const inputType = getInputType(name, label, showVisibilityButtons, isFieldVisible)

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
                <FormControl component="fieldset" fullWidth>
                    <FlexBetweenContainer>
                        <FormLabel
                            id={`${label}-input-label`}
                            sx={{ "&.MuiFormLabel-root": { fontWeight: "bolder" }, typography: "body2" }}
                        >
                            {label}
                        </FormLabel>

                        {showVisibilityButtons ? (
                            <FormFieldVisibilityIcon
                                inputName={name}
                                isFieldVisible={isFieldVisible}
                                isFieldVisibleToggle={isFieldVisibleToggle}
                            />
                        ) : null}
                    </FlexBetweenContainer>

                    <FilledInput
                        {...field}
                        autoComplete={label}
                        endAdornment={
                            // only show clear icon if text-field is not empty
                            watch(name) !== "" && (
                                <InputAdornment position="end">
                                    <Tooltip title={`clear ${name}`}>
                                        {/* reset the input field */}
                                        <IconButton onClick={() => setValue(name, "")}>
                                            <ClearIcon color="secondary" />
                                        </IconButton>
                                    </Tooltip>
                                </InputAdornment>
                            )
                        }
                        error={!!error}
                        fullWidth
                        id={`${name}-input`}
                        onChange={(event) => {
                            if (type === "number") {
                                field.onChange(Number(event.target.value))
                            } else {
                                field.onChange(event.target.value)
                            }
                        }}
                        placeholder={placeholder || label}
                        required
                        startAdornment={startAdornment || null}
                        sx={{
                            "& .MuiFilledInput-input": {
                                p: padding || 1.5,
                            },
                        }}
                        type={inputType}
                        value={type === "number" && field.value === 0 ? "" : field.value}
                        {...other}
                    />
                    {error && <FormHelperText error={!!error}>{error?.message}</FormHelperText>}
                </FormControl>
            )}
        />
    )
}

/*
 * sets the input type based on whether the visibility icons are shown or not
 * whether the field is currently visible
 * and whether the label and name is email or not
 */
function getInputType(name: string, label: string, showButtons: boolean | undefined, isFieldVisible: boolean) {
    let inputType: string

    if (name.toLowerCase() === "email" || label.toLowerCase() === "email") {
        inputType = "email"
    } else if (showButtons && !isFieldVisible) {
        inputType = "password"
    } else {
        inputType = "text"
    }
    return inputType
}
