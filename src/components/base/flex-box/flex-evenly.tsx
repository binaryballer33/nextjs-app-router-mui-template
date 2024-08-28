import type { BoxProps } from "@mui/material/Box"
import Box from "@mui/material/Box"

export default function FlexEvenly({ children, ...props }: BoxProps) {
    return (
        <Box display="flex" alignItems="center" justifyContent="space-evenly" {...props}>
            {children}
        </Box>
    )
}
