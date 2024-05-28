import React, { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Dialog, DialogTitle, DialogContent, DialogContentText } from '@mui/material';

function Reports({ tasks }) {
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedTasks, setSelectedTasks] = useState([]);

  const handleClickOpen = (user) => {
    setSelectedUser(user);
    const userTasks = tasks.filter(task => task.assignedTo === user);
    setSelectedTasks(userTasks);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formatTimeSpent = (start, end) => {
    const diff = end - start;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return `${days}d ${hours}g ${minutes}m ${seconds}s`;
  };

  const taskCount = tasks.length;
  const assignedTasks = tasks.reduce((acc, task) => {
    acc[task.assignedTo] = (acc[task.assignedTo] || 0) + 1;
    return acc;
  }, {});

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Raporty</Typography>
      <Typography>Całkowita liczba zadań: {taskCount}</Typography>
      <Typography variant="subtitle1" gutterBottom>Przypisane zadania:</Typography>
      <List>
        {Object.entries(assignedTasks).map(([member, count]) => (
          <ListItem button key={member} onClick={() => handleClickOpen(member)}>
            <ListItemText primary={`${member}: ${count}`} />
          </ListItem>
        ))}
      </List>

      <Dialog open={open} onClose={handleClose} aria-labelledby="user-tasks-dialog-title">
        <DialogTitle id="user-tasks-dialog-title">Zadania {selectedUser}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {selectedTasks.length > 0 ? (
              <List>
                {selectedTasks.map(task => (
                  <ListItem key={task.id}>
                    <ListItemText
                      primary={task.title}
                      secondary={`Czas wykonania: ${task.completedAt ? formatTimeSpent(new Date(task.assignedAt), new Date(task.completedAt)) : 'N/A'}`}
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography>Brak przypisanych zadań.</Typography>
            )}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default Reports;