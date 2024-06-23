'use client'

import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Stack,
  styled,
  SwipeableDrawer,
  Theme,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { DividerLight } from 'src/components/base/styles/card'
import { useDialog } from 'src/hooks/use-dialog'
import { useMobileNav } from 'src/hooks/use-mobile-nav'
import { usePopover } from 'src/hooks/use-popover'
import { useMenuItems } from 'src/router/navbar'
import { neutral } from 'src/theme/theme'
import { Menu } from './desktop-navbar/desktop-navbar'
import { MobileNavBar } from './mobile-navbar/mobile-navbar'
import LanguageDropdown from './navbar-icons/language-icon/language-icon-dropdown'
import { Logo } from './navbar-icons/logo/logo'
import { ProfileIconDropdown } from './navbar-icons/profile-icon-dropdown/profile-icon-dropdown-content'
import { BasicSpotlightSearch } from './navbar-icons/search-icon/search-icon'
import ThemeModeToggler from './navbar-icons/theme-mode-toggler/theme-mode-toggler'

const HeaderWrapper = styled(AppBar)(({ theme }) => ({
  display: 'flex',
  position: 'relative',
  background: 'transparent',
  color: theme.palette.mode === 'dark' ? neutral[100] : neutral[900],
  zIndex: 6,
}))

export const Header = () => {
  const smUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'))
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'))
  const popover = usePopover<HTMLButtonElement>()
  const theme = useTheme()
  const dialog = useDialog()
  const menuItems = useMenuItems()
  const { handleClose, handleOpen, open } = useMobileNav()

  return (
    <>
      <HeaderWrapper role="banner" elevation={0}>
        <Stack py={3} flex={1} direction="row" justifyContent="space-between" alignItems="center">
          <Stack
            direction="row"
            divider={
              <DividerLight
                sx={{
                  height: 24,
                  alignSelf: 'center',
                }}
                orientation="vertical"
                flexItem
              />
            }
            alignItems="center"
            spacing={2}
          >
            <Box sx={{ transform: 'scale(.86)' }}>
              <Logo dark isLinkStatic />
            </Box>
            {lgUp && <Menu menuItems={menuItems} />}
          </Stack>
          <Stack
            direction="row"
            divider={
              <DividerLight
                sx={{
                  height: 24,
                  alignSelf: 'center',
                }}
                orientation="vertical"
                flexItem
              />
            }
            alignItems="center"
            spacing={{ xs: 1, sm: 2 }}
          >
            <Stack display="flex" spacing={1} direction="row" alignItems="center">
              {smUp && (
                <>
                  <IconButton
                    onClick={dialog.handleOpen}
                    color="inherit"
                    sx={{
                      '&:hover': {
                        background: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                      },
                      p: 1,
                      '& .MuiSvgIcon-root': {
                        fontSize: 22,
                      },
                    }}
                  >
                    <SearchRoundedIcon />
                  </IconButton>
                </>
              )}
            </Stack>

            <LanguageDropdown
              sx={{
                '&:hover': {
                  background: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                },
                p: 1,
                '& .MuiSvgIcon-root': {
                  fontSize: 22,
                },
              }}
            />

            <ThemeModeToggler />

            {/* Profile Icon */}
            <IconButton
              id="profile-button"
              color="primary"
              sx={{
                p: 0,
                '&:hover': {
                  boxShadow: `0 0 0 3px ${theme.palette.primary.main}`,
                },
              }}
              aria-controls={popover.open ? 'profile-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={popover.open ? 'true' : undefined}
              onClick={popover.handleOpen}
              ref={popover.anchorRef}
            >
              <Avatar
                alt={'Shaquille Mandy'}
                src={''}
                sx={{
                  borderRadius: 'inherit',
                  height: 36,
                  width: 36,
                }}
              />
            </IconButton>

            {/* Show Mobile Menu Icon Button */}
            {!lgUp && (
              <IconButton
                onClick={handleOpen}
                color="inherit"
                sx={{
                  '&:hover': {
                    background: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                  },
                  p: 1,
                  '& .MuiSvgIcon-root': {
                    fontSize: 22,
                  },
                }}
              >
                <MenuRoundedIcon />
              </IconButton>
            )}
          </Stack>

          <BasicSpotlightSearch onClose={dialog.handleClose} open={dialog.open} />

          <ProfileIconDropdown
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            anchorEl={popover.anchorRef.current}
            onClose={popover.handleClose}
            open={popover.open}
          />
        </Stack>
      </HeaderWrapper>

      {/* Mobile NavBar Section */}
      {!lgUp && (
        <SwipeableDrawer
          anchor="left"
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: {
              overflow: 'hidden',
              backgroundColor: neutral[900],
              boxShadow: (theme) => theme.shadows[0],
            },
          }}
          variant="temporary"
        >
          <MobileNavBar />
        </SwipeableDrawer>
      )}
    </>
  )
}
