import { alpha, Button, styled } from "@mui/material"

const ButtonLight = styled(Button)(({ theme }) => ({
    "&:hover": {
        background: alpha(theme.palette.common.white, 0.1),
        color: theme.palette.common.white,
    },
    "&.MuiButton-outlined": {
        "&:hover": {
            borderColor: alpha(theme.palette.common.white, 0.16),
        },

        borderColor: alpha(theme.palette.common.white, 0.12),
    },
    background: alpha(theme.palette.common.white, 0.08),

    borderColor: alpha(theme.palette.common.white, 0.12),

    color: alpha(theme.palette.common.white, 0.9),
}))

export default ButtonLight
