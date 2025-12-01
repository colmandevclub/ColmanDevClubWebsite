import React from 'react';
import { FormControl, InputLabel, Select, MenuItem,Stack } from '@mui/material';
import StyledChip from 'src/ui/StyledChip/StyledChip';
const ControlPanel = ({ selectedProgram, programs, onProgramChange, onClickAddWeek, onOpenMemberModal }) => {
  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
      <FormControl variant="outlined" size="small">
        <InputLabel id="program-select-label">Select Program</InputLabel>
        <Select
          labelId="program-select-label"
          value={selectedProgram}
          onChange={(e) => onProgramChange(e.target.value)}
          label="Select Program"
        >
          {programs.map((program) => (
            <MenuItem key={program.id} value={program.id}>
              {program.value} 
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <StyledChip
        label="Add Week"
        onClick={onClickAddWeek}
        color="primary"
      />

      <StyledChip
        label="Add Member"
        onClick={onOpenMemberModal}
        color="primary"
      />
    </Stack>
  );
};

export default ControlPanel;
