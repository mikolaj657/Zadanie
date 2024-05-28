import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

function TaskForm({ teamMembers, addTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && description && assignedTo) {
      addTask(title, description, assignedTo);
      setTitle('');
      setDescription('');
      setAssignedTo('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} mb={2}>
      <Typography variant="h6" gutterBottom>Dodaj zadanie</Typography>
      <TextField
        label="Nazwa zadania"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Opis zadania"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Przypisz do</InputLabel>
        <Select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)}>
          {teamMembers.map(member => (
            <MenuItem key={member.id} value={member.name}>{member.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary">Dodaj</Button>
    </Box>
  );
}

export default TaskForm;