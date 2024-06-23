import DarkModeTwoToneIcon from '@mui/icons-material/DarkModeTwoTone'
import LightModeTwoToneIcon from '@mui/icons-material/LightModeTwoTone'
import { alpha, Button, useTheme } from '@mui/material'
import { useDispatch } from 'react-redux'
import { toggleTheme } from 'src/slices/theme'

function ThemeModeToggler() {
  const theme = useTheme()
  const dispatch = useDispatch()
  const handleThemeToggle = () => dispatch(toggleTheme())

  return (
    <Button
      variant={'outlined'}
      onClick={handleThemeToggle}
      aria-label="Dark/Light Mode Toggler"
      sx={{
        borderRadius: 2,
        minWidth: 'auto',
        padding: 0.5,
        borderColor: alpha(theme.palette.divider, 0.2),
      }}
    >
      {theme.palette.mode === 'light' ? <LightModeTwoToneIcon /> : <DarkModeTwoToneIcon />}
    </Button>
  )
}

export default ThemeModeToggler
