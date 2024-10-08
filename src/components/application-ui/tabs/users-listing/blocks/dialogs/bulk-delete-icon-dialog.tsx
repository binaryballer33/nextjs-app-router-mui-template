import { useState } from "react"

import CloseRoundedIcon from "@mui/icons-material/CloseRounded"
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded"
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded"
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded"
import {
    alpha,
    Box,
    Button,
    Card,
    Dialog,
    DialogActions,
    DialogContent,
    IconButton,
    Stack,
    Tooltip,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"

import { AvatarState } from "src/components/base/styles/avatar"
import ButtonIcon from "src/components/base/styles/button-icon"

import AlertDialogContent from "./alert-dialog-content"

function BulkDeleteIconDialog() {
    const { t } = useTranslation()
    const theme = useTheme()
    const smUp = useMediaQuery(theme.breakpoints.up("sm"))
    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleNotificationClick = () => {
        setOpen(false)

        //  Custom Card Toast Notification
        toast.custom(
            (message) => (
                //  Toast Component
                <Card elevation={21} className={`${message.visible ? "animate-enter" : "animate-leave"}`}>
                    <Box
                        sx={{
                            position: "relative",
                            minWidth: 320,
                            maxWidth: 340,
                        }}
                    >
                        {/* Dismiss The Toast Button */}
                        <IconButton
                            color="primary"
                            sx={{
                                p: 0.2,
                                position: "absolute",
                                right: (prTheme) => prTheme.spacing(1),
                                top: (ptTheme) => ptTheme.spacing(1),
                            }}
                            size="small"
                            onClick={() => toast.dismiss(message.id)}
                        >
                            <CloseRoundedIcon fontSize="inherit" />
                        </IconButton>

                        {/* Toast Content */}
                        <Box
                            sx={{
                                px: 2,
                                py: 1.5,
                                display: "flex",
                                transition: "none",
                                alignItems: "flex-start",
                                "&:hover": {
                                    backgroundColor: (bgColorTheme) => alpha(bgColorTheme.palette.primary.main, 0.01),
                                },
                            }}
                        >
                            {/* Toast Avatar */}
                            <AvatarState
                                state="error"
                                variant="rounded"
                                useShadow
                                sx={{
                                    width: 40,
                                    height: 40,
                                    mt: 0.4,
                                }}
                            >
                                <WarningAmberRoundedIcon fontSize="small" />
                            </AvatarState>

                            {/* Toast Text */}
                            <Box ml={1.5} flex={1} pt={0.5} overflow="hidden">
                                <Typography sx={{ pb: 1 }} variant="h6">
                                    Items deleted successfully
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary">
                                    The entries you selected have been removed successfully.
                                </Typography>
                                <Stack mt={1.5} mb={0.5} spacing={1} direction="row">
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        size="small"
                                        sx={{
                                            color: "primary.main",
                                        }}
                                        startIcon={<ReplayRoundedIcon fontSize="small" />}
                                        onClick={() => toast.dismiss(message.id)}
                                    >
                                        Undo
                                    </Button>
                                </Stack>
                            </Box>
                        </Box>
                    </Box>
                </Card>
            ),
            {
                position: "top-right",
            },
        )
    }

    return (
        <>
            {/* Display Delete Button With Text On Tablet And Up Screen Size */}
            {smUp ? (
                <Button
                    variant="outlined"
                    color="secondary"
                    size="small"
                    startIcon={<DeleteOutlineRoundedIcon fontSize="small" />}
                    sx={{ color: "error.main" }}
                    onClick={handleClickOpen}
                >
                    {t("Delete selected")}
                </Button>
            ) : (
                //  Display Delete Icon Button No Text On Mobile Screen Size
                <Tooltip arrow placement="top" title={t("Delete selected")}>
                    <ButtonIcon
                        variant="outlined"
                        color="error"
                        sx={{ color: "error.main" }}
                        size="small"
                        startIcon={<DeleteOutlineRoundedIcon fontSize="small" />}
                        onClick={handleClickOpen}
                    />
                </Tooltip>
            )}

            {/* If Delete Icon Clicked Show Dialog To Confirm Deletion */}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="basic-dialog-title"
                maxWidth="sm"
                fullWidth
                sx={{
                    ".MuiDialog-container": {
                        alignItems: { xs: "flex-end", sm: "center" },
                    },
                }}
            >
                <DialogContent>
                    <AlertDialogContent />
                </DialogContent>
                <DialogActions
                    sx={{
                        backgroundColor: (bgColorTheme) =>
                            bgColorTheme.palette.mode === "dark"
                                ? alpha(bgColorTheme.palette.neutral[25], 0.02)
                                : "neutral.25",
                        flexDirection: { xs: "column-reverse", sm: "row" },

                        "& > :not(:first-of-type)": {
                            marginLeft: { xs: 0, sm: theme.spacing(1) },
                            marginBottom: { xs: theme.spacing(1), sm: 0 },
                        },
                    }}
                >
                    <Button variant="outlined" color="secondary" autoFocus fullWidth={!smUp} onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button
                        color="error"
                        variant="contained"
                        onClick={handleNotificationClick}
                        autoFocus
                        fullWidth={!smUp}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default BulkDeleteIconDialog
