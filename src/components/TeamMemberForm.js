import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

function TeamMemberForm({ addTeamMember }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      addTeamMember(name);
      setName('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} mb={2}>
      <Typography variant="h6" gutterBottom>Dodaj członka zespołu</Typography>
      <TextField
        label="Imię Nazwisko"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">Dodaj</Button>
    </Box>
  );
}

export default TeamMemberForm;