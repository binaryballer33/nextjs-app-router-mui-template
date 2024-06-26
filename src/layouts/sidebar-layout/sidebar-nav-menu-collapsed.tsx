import { Box, List, ListItemIcon } from '@mui/material'
import { usePathname } from 'next/navigation'
import React, { FC, useState } from 'react'
import { RouterLink } from 'src/components/base/router-link'
import { NavBarItem } from 'src/models/navbar-item'
import { ListItemButtonWrapper } from './sidebar-nav-menu'

interface NavItemProps {
  item: NavBarItem
}

const NavItem: React.FC<NavItemProps> = ({ item }) => {
  const { icon, route, subMenu } = item
  const pathname = usePathname()
  const isActive = route && pathname.includes(route)
  const isSubMenuActive = subMenu?.some((sub) => sub.route && pathname.includes(sub.route))

  const [open, setOpen] = useState(isSubMenuActive)

  const handleToggle = () => {
    if (subMenu) {
      setOpen(!open)
    }
  }

  return (
    <Box px={2}>
      <ListItemButtonWrapper
        sx={{
          pl: 1.7,
          mb: 0.5,
        }}
        selected={isActive || isSubMenuActive}
        onClick={handleToggle}
        //@ts-ignore
        component={route ? RouterLink : 'a'}
        href={route ? route : undefined}
      >
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
      </ListItemButtonWrapper>
    </Box>
  )
}

interface SidebarNavMenuCollapsedProps {
  navbar_items?: NavBarItem[]
}

export const SidebarNavMenuCollapsed: FC<SidebarNavMenuCollapsedProps> = ({ navbar_items = [] }) => {
  return (
    <Box>
      {navbar_items.map((navbar_itme) => (
        <div key={navbar_itme.title}>
          <List component="nav">
            {navbar_itme.subMenu?.map((subItem) => <NavItem key={subItem.title} item={subItem} />)}
          </List>
        </div>
      ))}
    </Box>
  )
}
