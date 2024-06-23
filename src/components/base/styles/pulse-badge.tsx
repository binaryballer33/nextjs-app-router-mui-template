import { Badge, styled } from '@mui/material';
import { ReactNode } from 'react';

type BadgeColor = 'success' | 'error' | 'primary' | 'secondary' | 'warning' | 'info';

interface PulseBadgeProps {
  color?: BadgeColor;
  children?: ReactNode;
}

export const PulseBadge = styled(Badge)<PulseBadgeProps>(({ theme, color }) => {
  const computedColor = color ? theme.palette[color].main : theme.palette.success.main;

  return {
    '& .MuiBadge-badge': {
      backgroundColor: computedColor,
      color: computedColor,
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  };
});
