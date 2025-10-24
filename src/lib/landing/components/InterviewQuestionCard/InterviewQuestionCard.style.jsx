import { Card, styled } from '@mui/material';

export const TeamMemberCardContainer = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  border: '1px solid #F6C927',
  borderRadius: '1rem',
  boxShadow: '0px 0px 2px 0px #F6C927',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0px 0px 10px 0px #F6C927',
  },
}));
