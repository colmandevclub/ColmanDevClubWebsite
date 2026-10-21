
import { Avatar, Box, styled } from '@mui/material';

export const TeamMemberCardContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  perspective: '1200px',
  borderRadius: '1rem',

  '&[data-legacy="true"]': {
    width: '100%',
    maxWidth: 320,
    aspectRatio: '1',
    boxSizing: 'border-box',
    marginInline: 'auto',
    borderRadius: '50%',
    padding: 5,
    background: 'linear-gradient(135deg, #fff4c2, #c49a27 45%, #fff4c2 70%, #8d6b12)',
    boxShadow: '0 8px 28px #d4af3740',
  },

  '&[data-legacy="true"] > div': {
    position: 'absolute',
    inset: 5,
    width: 'auto',
    height: 'auto',
    gridTemplateRows: '1fr',
  },

  '&[data-legacy="true"] .card-face': {
    width: '100%',
    height: '100%',
    minHeight: 0,
    boxSizing: 'border-box',
    padding: theme.spacing(2),
    gap: theme.spacing(2),
    borderRadius: '50%',
    border: '4px solid #fff',
    background: 'radial-gradient(circle at 35% 25%, #34344b, #10101f 72%)',
    color: '#fff',
    overflow: 'hidden',
  },

  '&[data-legacy="true"] .MuiAvatar-root': {
    width: 'clamp(72px, 34%, 112px)',
    height: 'clamp(72px, 34%, 112px)',
    border: '3px solid #fff',
    boxShadow: '0 0 0 3px #d4af37, 0 0 18px #d4af3780',
  },

  '&[data-legacy="true"] h3': {
    fontSize: 'clamp(1rem, 5vw, 1.4rem)',
  },

  '&[data-legacy="true"] .card-back p': {
    fontSize: 'clamp(0.9rem, 4vw, 1.1rem)',
    color: '#f6d778',
  },

  '&:focus-within': {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: 4,
  },

  '&:hover .card-face, &:focus-within .card-face': {
    boxShadow: `0 0 10px 0 ${theme.palette.primary.main}55`,
  },
}));

export const CardToggle = styled('button')({
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  border: 0,
  borderRadius: 'inherit',
  padding: 0,
  background: 'transparent',
  cursor: 'pointer',
  outline: 'none',
});

export const CardFlip = styled('div')({
  display: 'grid',
  position: 'relative',
  pointerEvents: 'none',
  transformStyle: 'preserve-3d',
  transition: 'transform 600ms cubic-bezier(0.22, 0.61, 0.36, 1)',

  '&[data-flipped="true"]': {
    transform: 'rotateY(180deg)',
  },

  '@media (prefers-reduced-motion: reduce)': {
    transition: 'none',
  },
});

export const CardFace = styled('div')(({ theme }) => ({
  gridArea: '1 / 1',
  minWidth: 0,
  minHeight: 374,
  padding: theme.spacing(3, 2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(3),
  textAlign: 'center',
  overflowWrap: 'break-word',
  borderRadius: '1rem',
  border: `1px solid ${theme.palette.primary.main}`,
  backgroundColor: theme.palette.background.default,
  boxShadow: `0 0 2px 0 ${theme.palette.primary.main}`,
  backfaceVisibility: 'hidden',
  WebkitBackfaceVisibility: 'hidden',
  transition: 'box-shadow 250ms ease',

  [theme.breakpoints.up('xl')]: {
    minHeight: 474,
  },

  '&.card-back': {
    transform: 'rotateY(180deg)',
  },

  '& .MuiIconButton-root': {
    pointerEvents: 'auto',
    minWidth: 48,
    minHeight: 48,

    '&:hover, &:focus-visible': {
      backgroundColor: `${theme.palette.primary.main}18`,
      borderColor: theme.palette.primary.main,
    },

    '&:focus-visible': {
      outline: `2px solid ${theme.palette.primary.main}`,
      outlineOffset: 3,
    },
  },

  '&[aria-hidden="true"] .MuiIconButton-root': {
    pointerEvents: 'none',
  },

  '@media (prefers-reduced-motion: reduce)': {
    transition: 'none',
  },
}));

export const MemberAvatar = styled(Avatar)(({ theme }) => ({
  width: 150,
  height: 150,
  borderWidth: '3px',

  [theme.breakpoints.up('lg')]: {
    borderWidth: '5px',
  },
}));
