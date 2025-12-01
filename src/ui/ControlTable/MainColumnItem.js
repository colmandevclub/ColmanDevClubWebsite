import React, { useState } from 'react';
import { IconButton, Modal, Box, Avatar, Stack } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import './mainColumnItem.css';

const MainColumnItem = ({ data }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Stack direction={'row'} px={2}>
      <Avatar  src={data.img ?? ''} />
      <div className="main-column-text">
        {data.title && (
          <div className="main-column-title" style={{ color: '#F6C927' }}>
            {data.title}
          </div>
        )}
        {data.subtitle && (
          <div key={data.subtitle} className="main-column-subtitle">
            {data.subtitle}
          </div>
        )}
      </div>
      <IconButton onClick={handleOpen} sx={{ backgroundColor: '#131331' }}>
        <MoreHorizIcon className="main-column-details-icon" style={{ color: 'white' }} />
      </IconButton>

      <Modal open={open} onClose={handleClose}>
        <Box className="main-column-modal">
          <h3>Details</h3>
          <p>{data.details || 'No additional details available'}</p>
        </Box>
      </Modal>
    </Stack>
  );
};

export default MainColumnItem;
