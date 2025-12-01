import React, { useState } from 'react';
import { TextField, Button, Stack, Tooltip } from '@mui/material';
import StyledChip from '../StyledChip/StyledChip';

const UrlInputField = ({ label, urlString, setUrlString }) => {
  const [url, setUrl] = useState('');

  const handleAddUrl = () => {
    if (url) {
      const updatedUrls = urlString ? `${urlString},${url}` : url;
      setUrlString(updatedUrls);
      setUrl(''); 
    }
  };

  const handleDeleteUrl = (urlToDelete) => {
    const updatedUrls = urlString
      .split(',')
      .filter((u) => u.trim() !== urlToDelete)
      .join(',');
    setUrlString(updatedUrls);
  };

  const urlsArray = urlString ? urlString.split(',') : [];

  return (
    <Stack >
      <Stack direction="row" spacing={1} marginBottom={1} marginTop={1}>
        <TextField
          label={label}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddUrl()} // Add URL on Enter key
          fullWidth
          size="small"
        />
        <Button onClick={handleAddUrl} variant="contained" size='small' sx={{ padding: 0 }}>+</Button>
      </Stack>
      <Stack direction="row" sx={{ flexWrap: 'wrap' }}>
        {urlsArray.map((u) => (
          <Tooltip title={u} key={u} placement="top">
            <StyledChip
              key={u}
              label={u}
              onDelete={() => handleDeleteUrl(u)}
              sx={{ maxWidth: 100 }} 
            />
          </Tooltip>
        ))}
      </Stack>
    </Stack>
  );
};

export default UrlInputField;
