import React, { useState } from 'react';
import { Box, Typography, Paper, Grid, TextField, Button, Alert, MenuItem } from '@mui/material';

const EmployeePortal = () => {
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>Employee Portal (Self-Service)</Typography>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
        <Box sx={{ flex: 1 }}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Apply for Leave</Typography>
            {success && <Alert severity="success" sx={{ mb: 2 }}>Leave request submitted to Manager!</Alert>}
            <form onSubmit={handleSubmit}>
              <TextField fullWidth label="Leave Type" select defaultValue="Sick Leave" sx={{ mb: 2 }}>
                <MenuItem value="Sick Leave">Sick Leave</MenuItem>
                <MenuItem value="Casual Leave">Casual Leave</MenuItem>
                <MenuItem value="Earned Leave">Earned Leave</MenuItem>
              </TextField>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField fullWidth label="Start Date" type="date" InputLabelProps={{ shrink: true }} defaultValue="2026-07-13" required sx={{ mb: 2 }} />
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth label="End Date" type="date" InputLabelProps={{ shrink: true }} defaultValue="2026-07-15" required sx={{ mb: 2 }} />
                </Grid>
              </Grid>
              <TextField fullWidth label="Reason" multiline rows={3} required sx={{ mb: 2 }} />
              <Button type="submit" variant="contained" color="primary">Submit Request</Button>
            </form>
          </Paper>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>My Quick Links</Typography>
            <Button fullWidth variant="outlined" sx={{ mb: 2 }}>Download Offer Letter</Button>
            <Button fullWidth variant="outlined" sx={{ mb: 2 }}>Company Holiday List</Button>
            <Button fullWidth variant="outlined" color="secondary">Update Bank Details</Button>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default EmployeePortal;
