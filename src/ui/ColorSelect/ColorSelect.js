import React, { useState, useEffect } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { OutlinedInput, Box } from '@mui/material';
import { StyledSelect, StyledMenuItem } from './styledComponents';
import { Circle } from '@mui/icons-material';

const ColorSelect = ({ colors, onColorSelect, defaultValue }) => {
  const [selectedKey, setSelectedKey] = useState('');

  useEffect(() => {
    const initialKey = defaultValue || Object.keys(colors)[0];
    setSelectedKey(initialKey);
  }, [colors, defaultValue, onColorSelect]);

  const handleColorChange = (event) => {
    const key = event.target.value;
    setSelectedKey(key);
    onColorSelect({ key, value: colors[key] });
  };

  return (
    <StyledSelect
      value={selectedKey}
      onChange={handleColorChange}
      displayEmpty
      input={<OutlinedInput />}
      IconComponent={ExpandMoreIcon}
      renderValue={(selected) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Circle style={{ color: colors[selected] }} />
        </Box>
      )}
    >
      {Object.keys(colors).map((key) => (
        <StyledMenuItem key={key} value={key}>
          <Circle style={{ color: colors[key], marginRight: 8 }} />
          {key}
        </StyledMenuItem>
      ))}
    </StyledSelect>
  );
};

export default ColorSelect;
