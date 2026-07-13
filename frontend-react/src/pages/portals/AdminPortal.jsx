import React, { useState } from 'react';
import { Box, Typography, Paper, Grid, TextField, Button, Alert } from '@mui/material';

const AdminPortal = () => {
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>Admin Portal</Typography>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
        <Box sx={{ flex: 1 }}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Create New Role</Typography>
            {success && <Alert severity="success" sx={{ mb: 2 }}>Role created successfully!</Alert>}
            <form onSubmit={handleSubmit}>
              <TextField fullWidth label="Role Name" required sx={{ mb: 2 }} />
              <TextField fullWidth label="Permissions (Comma separated)" sx={{ mb: 2 }} />
              <Button type="submit" variant="contained" color="error">Add Role</Button>
            </form>
          </Paper>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>System Configuration</Typography>
            <TextField fullWidth label="Company Name" defaultValue="Enterprise Solutions Ltd" sx={{ mb: 2 }} />
            <TextField fullWidth label="Support Email" defaultValue="support@enterprise.com" sx={{ mb: 2 }} />
            <Button variant="outlined" color="primary">Update Config</Button>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminPortal;
