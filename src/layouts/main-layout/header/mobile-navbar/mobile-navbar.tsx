import type { ListProps, Theme } from "@mui/material"
import { Box, List, ListSubheader, styled, useMediaQuery } from "@mui/material"
import PropTypes from "prop-types"

import Scrollbar from "src/components/base/scrollbar"
import Logo from "src/layouts/main-layout/header/navbar-icons/logo/logo"
import type { NavBarItem } from "src/models/navbar-item"
import { neutral } from "src/theme/theme"
import { SIDEBAR_WIDTH } from "src/theme/utils"

import MobileNavBarNavItem from "./mobile-navbar-nav-item"

const MobileSidebarWrapper = styled(Box)(({ theme }) => ({
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    color: theme.palette.mode === "dark" ? neutral[100] : neutral[900],
    background: theme.palette.mode === "dark" ? neutral[900] : neutral[100],
    overflow: "auto",
}))

type MobileNavBarProps = {
    navbarItems?: NavBarItem[]
}

const ListSubheaderWrapper = styled(ListSubheader)<ListProps<"div", { component: "div" }>>(({ theme }) => ({
    background: theme.palette.mode === "dark" ? neutral[900] : neutral[100],
    textTransform: "uppercase",
    fontWeight: 500,
    fontSize: 13,
    color: theme.palette.mode === "dark" ? neutral[100] : neutral[900],
    lineHeight: theme.spacing(5),
    padding: theme.spacing(0, 2),
}))

export default function MobileNavBar({ navbarItems }: MobileNavBarProps) {
    const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"))
    if (!navbarItems) return null

    return (
        <MobileSidebarWrapper
            component="nav"
            role="navigation"
            sx={{
                width: SIDEBAR_WIDTH,
            }}
        >
            <Box p={2} display="flex" justifyContent={{ xs: "flex-start", lg: "space-between" }} alignItems="center">
                <Logo />
            </Box>

            <Box>
                <Box flex={1} overflow="auto" position="relative" zIndex={6}>
                    <Scrollbar dark>
                        {navbarItems.map((navbarItem) => (
                            <Box key={navbarItem.title}>
                                <List
                                    component="nav"
                                    subheader={
                                        <ListSubheaderWrapper component="div" disableSticky={!mdUp}>
                                            {navbarItem.title}
                                        </ListSubheaderWrapper>
                                    }
                                >
                                    {navbarItem.subMenu?.map((subItem) => (
                                        <MobileNavBarNavItem key={subItem.title} item={subItem} />
                                    ))}
                                </List>
                            </Box>
                        ))}
                    </Scrollbar>
                </Box>
            </Box>
        </MobileSidebarWrapper>
    )
}

MobileNavBar.propTypes = {
    navbarItems: PropTypes.array,
}
