import React, { useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import TeamMemberForm from './components/TeamMemberForm';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Reports from './components/Reports';

function App() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [tasks, setTasks] = useState([]);

  const addTeamMember = (name) => {
    setTeamMembers([...teamMembers, { id: teamMembers.length + 1, name }]);
  };

  const addTask = (title, description, assignedTo) => {
    setTasks([...tasks, {
      id: tasks.length + 1,
      title,
      description,
      assignedTo,
      status: 'Do zrobienia',
      assignedAt: new Date(),
      completedAt: null
    }]);
  };

  const updateTaskStatus = (taskId, status) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status, completedAt: status === 'Zakończone' ? new Date() : task.completedAt } : task
    ));
  };

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          System zarządzania zadaniami w zespole.
        </Typography>
        <TeamMemberForm addTeamMember={addTeamMember} />
        <TaskForm teamMembers={teamMembers} addTask={addTask} />
        <TaskList tasks={tasks} updateTaskStatus={updateTaskStatus} />
        <Reports tasks={tasks} />
      </Box>
    </Container>
  );
}

export default App;