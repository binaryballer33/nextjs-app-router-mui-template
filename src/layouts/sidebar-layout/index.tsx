import { type ReactNode } from "react"

import PropTypes from "prop-types"

import { Box } from "@mui/material"

import useMobileNav from "src/hooks/use-mobile-nav"

import useVerticalNavBarItems from "src/routes/vertical-navbar-routes"

import Sidebar from "./sidebar"

type SideBarLayoutProps = {
    children?: ReactNode
}

export default function SideBarLayout(props: SideBarLayoutProps) {
    const { children } = props
    const navbarItems = useVerticalNavBarItems()
    const mobileNav = useMobileNav()

    return (
        <Box display="flex" gap={4}>
            <Sidebar
                navbarItems={navbarItems}
                onClose={mobileNav.handleClose}
                onOpen={mobileNav.handleOpen}
                open={mobileNav.open}
            />
            <Box
                flex={1}
                overflow="hidden"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {children}
            </Box>
        </Box>
    )
}

SideBarLayout.propTypes = {
    children: PropTypes.node,
}
