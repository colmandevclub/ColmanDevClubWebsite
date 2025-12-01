import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Checkbox, FormControlLabel, List, ListItem, Typography,Box } from '@mui/material';
import { UserService } from 'src/services/user.service'; 

const AddMemberDialog = ({ open, onClose, programRef }) => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]); 

  const fetchUsers = async () => {
    const usersData = await UserService.getUsers();
    setUsers(usersData);
    
    const initialSelectedUsers = usersData.filter(user => user.appliciant_data?.programRef === programRef).map(user => user.id);
    setSelectedUsers(initialSelectedUsers);
  };

  useEffect(() => {
    if (open) {
      fetchUsers();
    }
  }, [open]);

  const handleToggleUser = (userId) => {
    setSelectedUsers((prev) => {
      if (prev.includes(userId)) {
        return prev.filter((id) => id !== userId); 
      } else {
        return [...prev, userId]; 
      }
    });
  };

  const handleSubmit = async () => {
    let hasChanges = false;
    for (const user of users) {
      const shouldBeInProgram = selectedUsers.includes(user.id);
      const currentProgramRef = user.appliciant_data?.programRef;
      if (shouldBeInProgram && currentProgramRef !== programRef) {
        hasChanges = true;
        await UserService.updateUserProgramRef(user.id, programRef);
      } else if (!shouldBeInProgram && currentProgramRef === programRef) {
        hasChanges = true;
        await UserService.updateUserProgramRef(user.id, '');
      }
    }
    onClose(hasChanges);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Select Members to Add</DialogTitle>
      <DialogContent>
        <List>
          {users.map((user) => (
            <ListItem key={user.id}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => handleToggleUser(user.id)}
                  />
                }
                label={`${user.first_name} ${user.last_name}`}
              />
            </ListItem>
          ))}
        </List>
        {users.length === 0 && (
          <Typography>No users available.</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Update
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default AddMemberDialog;
