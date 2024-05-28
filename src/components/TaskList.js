import React, { useState } from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, Select, MenuItem, Box, Typography, Dialog, DialogTitle, DialogContent, DialogContentText } from '@mui/material';

function TaskList({ tasks, updateTaskStatus }) {
  const [openTaskDialog, setOpenTaskDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState({});

  const handleClickOpenTaskDialog = (task) => {
    setSelectedTask(task);
    setOpenTaskDialog(true);
  };

  const handleCloseTaskDialog = () => {
    setOpenTaskDialog(false);
  };

  return (
    <Box mb={2}>
      <Typography variant="h6" gutterBottom>Lista zadań</Typography>
      <List>
        {tasks.map(task => (
          <ListItem button key={task.id} onClick={() => handleClickOpenTaskDialog(task)}>
            <ListItemText
              primary={task.title}
              secondary={`Przypisane do: ${task.assignedTo} | Status: ${task.status}`}
            />
            <ListItemSecondaryAction>
              <Select
                value={task.status}
                onChange={(e) => updateTaskStatus(task.id, e.target.value)}
              >
                <MenuItem value="Do zrobienia">Do zrobienia</MenuItem>
                <MenuItem value="W trakcie">W trakcie</MenuItem>
                <MenuItem value="Zakończone">Zakończone</MenuItem>
              </Select>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <Dialog open={openTaskDialog} onClose={handleCloseTaskDialog} aria-labelledby="task-description-dialog-title">
        <DialogTitle id="task-description-dialog-title">{selectedTask.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {selectedTask.description}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default TaskList;