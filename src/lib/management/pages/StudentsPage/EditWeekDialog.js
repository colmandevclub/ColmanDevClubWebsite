import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, FormControlLabel, Checkbox,Box } from '@mui/material';
import UrlInputField from '../../../../ui/UrlInputField/UrlInputField';

const EditWeekDialog = ({ open, onClose, onAddWeek,onUpdateWeek, newWeek, setNewWeek, default_order = 0 }) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewWeek((prevWeek) => ({
      ...prevWeek,
      [name]: value,
    }));
  };

  const handleToggleVisibility = (event) => {
    setNewWeek((prevWeek) => ({
      ...prevWeek,
      is_visible: event.target.checked,
    }));
  };

    // Define the list of URLs
    const urlFields = [
      { label: 'Presentation Links', fieldName: 'presantaion_links' },
      { label: 'YouTube Links', fieldName: 'youtube_links' },
      { label: 'Project Link', fieldName: 'project_link' },
      { label: 'Exercise Link', fieldName: 'exercise_link' },
      { label: 'Other Links', fieldName: 'other_links' },
    ];
  
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{newWeek.id ? "Edit Week" : "Create a New Week"}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="title"
          label="Week Title"
          fullWidth
          value={newWeek.title}
          onChange={handleInputChange}
          size="small"
        />
        <TextField
          margin="dense"
          name="subject"
          label="Subject"
          fullWidth
          value={newWeek.subject}
          onChange={handleInputChange}
          size="small"
        />
        <TextField
          margin="dense"
          name="order_num"
          label="Order Number"
          fullWidth
          value={newWeek.order_num || default_order}
          onChange={handleInputChange}
          size="small"
          type="number"
        />

        {urlFields.map((field) => (
          <UrlInputField
            key={field.fieldName}
            label={field.label}
            urlString={newWeek[field.fieldName]}
            setUrlString={(urls) =>
              setNewWeek((prev) => ({ ...prev, [field.fieldName]: urls }))
            }
          />
        ))}

        <FormControlLabel
          control={
            <Checkbox
              checked={newWeek.is_visible}
              onChange={handleToggleVisibility}
              color="primary"
              sx={{border: '1px solid primary.main'}}
            />
          }
          label="Visible"
        />
      </DialogContent>
      <DialogActions>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Button onClick={onClose} color="primary" size="small" >
            Cancel
          </Button>
          <Button onClick={newWeek.id ? onUpdateWeek : onAddWeek} color="primary" size="small" >
            {newWeek.id ? "Update" : "Create"}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default EditWeekDialog;
