import type { MouseEvent } from "react"
import { useState } from "react"

import CheckTwoToneIcon from "@mui/icons-material/CheckTwoTone"
import KeyboardArrowDownTwoToneIcon from "@mui/icons-material/KeyboardArrowDownTwoTone"
import type { Theme } from "@mui/material"
import {
    Avatar,
    Badge,
    Box,
    Button,
    Divider,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Stack,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material"

type Tenant = {
    id: number
    name: string
    logo: string
    description: string
}

type Props = {
    tenants: Tenant[]
    isHovered: boolean
    sidebarCollapsed: boolean
    currentTenant: Tenant
    onSwitch: (tenant: Tenant) => void
}

function TenantSwitcher(props: Props) {
    const { tenants, sidebarCollapsed, isHovered, currentTenant, onSwitch } = props
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"))
    const theme = useTheme()

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)

    const handleClose = () => setAnchorEl(null)

    const handleTenantSelect = (tenant: Tenant) => {
        onSwitch(tenant)
        handleClose()
    }

    const tenantDescription = (
        <Box ml={1} overflow="hidden">
            <Typography
                variant="subtitle2"
                fontWeight={600}
                lineHeight={1.2}
                sx={{
                    pb: 0.2,
                    color: (colorTheme) => colorTheme.palette.text.secondary,
                }}
            >
                {currentTenant.name}
            </Typography>
            <Typography
                variant="body1"
                noWrap
                lineHeight={1.2}
                sx={{
                    color: (colorTheme) => colorTheme.palette.text.secondary,
                }}
            >
                {currentTenant.description}
            </Typography>
        </Box>
    )

    return (
        <Box pr={2} py={1.5}>
            <Badge
                color="secondary"
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                sx={{
                    display: "flex",
                    ".MuiBadge-badge": {
                        animation: "pulse 1s infinite",
                        transition: (transitionTheme) => transitionTheme.transitions.create(["all"]),
                    },
                }}
                variant="dot"
            >
                <Button
                    color="primary"
                    fullWidth
                    endIcon={
                        mdUp && sidebarCollapsed ? (
                            isHovered && <KeyboardArrowDownTwoToneIcon />
                        ) : (
                            <KeyboardArrowDownTwoToneIcon />
                        )
                    }
                    onClick={handleClick}
                    sx={{
                        background: theme.palette.background.paper,
                        color: "primary",
                        textAlign: "left",
                        minWidth: 40,
                        px: 1.2,
                        borderWidth: 1,
                        borderStyle: "solid",
                        borderColor: theme.palette.background.paper,
                        "&:hover": {
                            color: "primary.dark",
                            background: theme.palette.background.paper,
                            borderColor: theme.palette.background.paper,
                        },
                    }}
                >
                    <Avatar variant="rounded" src={currentTenant.logo} alt={currentTenant.name} />
                    {mdUp && sidebarCollapsed ? isHovered && tenantDescription : tenantDescription}
                </Button>
            </Badge>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
                slotProps={{
                    paper: {
                        sx: {
                            width: 380,
                            ".MuiList-root": {
                                p: 0,
                            },
                        },
                    },
                }}
            >
                <Box
                    p={2}
                    sx={{
                        backgroundColor: theme.palette.background.default,
                    }}
                >
                    <Typography variant="h6">Select tenant</Typography>
                </Box>
                <Stack p={1} divider={<Divider />}>
                    {tenants.map((tenant) => (
                        <MenuItem
                            selected={currentTenant.id === tenant.id}
                            sx={{
                                pl: 1,
                                borderRadius: (borderRadiusTheme) => `${borderRadiusTheme.shape.borderRadius}px`,
                            }}
                            key={tenant.id}
                            onClick={() => handleTenantSelect(tenant)}
                        >
                            <ListItemIcon sx={{ mr: 1 }}>
                                <Avatar variant="rounded" src={tenant.logo} alt={tenant.name} />
                            </ListItemIcon>

                            <ListItemText
                                primary={tenant.name}
                                primaryTypographyProps={{
                                    fontWeight: 600,
                                }}
                                secondary={tenant.description}
                                secondaryTypographyProps={{
                                    noWrap: true,
                                }}
                            />
                            {currentTenant.id === tenant.id && (
                                <Box display="flex" alignItems="center" justifyContent="flex-end" minWidth={38}>
                                    <CheckTwoToneIcon color="primary" />
                                </Box>
                            )}
                        </MenuItem>
                    ))}
                </Stack>
            </Menu>
        </Box>
    )
}

export default TenantSwitcher
