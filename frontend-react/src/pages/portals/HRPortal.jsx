import React, { useState } from 'react';
import { Box, Typography, Paper, Grid, TextField, Button, Alert } from '@mui/material';

const HRPortal = () => {
  const [success, setSuccess] = useState(false);
  const [salarySuccess, setSalarySuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  const handleSalarySubmit = (e) => {
    e.preventDefault();
    setSalarySuccess(true);
    setTimeout(() => setSalarySuccess(false), 3000);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>HR Portal</Typography>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
        <Box sx={{ flex: 1 }}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Post Company Policy</Typography>
            {success && <Alert severity="success" sx={{ mb: 2 }}>Policy published to all employees!</Alert>}
            <form onSubmit={handleSubmit}>
              <TextField fullWidth label="Policy Title" required sx={{ mb: 2 }} />
              <TextField fullWidth label="Policy Content" multiline rows={4} required sx={{ mb: 2 }} />
              <Button type="submit" variant="contained" color="warning">Publish Policy</Button>
            </form>
          </Paper>

          <Paper sx={{ p: 3, borderRadius: 2, mt: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Add Employee Salary</Typography>
            {salarySuccess && <Alert severity="success" sx={{ mb: 2 }}>Salary details updated successfully!</Alert>}
            <form onSubmit={handleSalarySubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Employee ID" required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Effective Month" type="month" InputLabelProps={{ shrink: true }} required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Base Salary (₹)" type="number" required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Deductions (₹)" type="number" defaultValue={0} />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary">Save Salary</Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Quick Actions</Typography>
            <Button fullWidth variant="outlined" sx={{ mb: 2 }}>Initiate Appraisal Cycle</Button>
            <Button fullWidth variant="outlined" color="error" sx={{ mb: 2 }}>Process Resignation</Button>
            <Button fullWidth variant="outlined" color="success">Download Compliance Report</Button>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default HRPortal;
