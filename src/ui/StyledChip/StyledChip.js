import React from 'react';
import { Chip } from '@mui/material';

const StyledChip = ({ label, onClick, onDelete, color = "default", variant = "outlined", sx }) => {
  return (
      <Chip
        label={label}
        onClick={onClick}
        onDelete={onDelete}
        color={color}
        variant={variant}
        sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          cursor: 'pointer',
          borderColor: (theme) => theme.palette.primary.main,
          '&:hover': {
            borderColor: (theme) => theme.palette.primary.dark,
          },
          ...sx,
        }}
      />
  );
};

export default StyledChip;
