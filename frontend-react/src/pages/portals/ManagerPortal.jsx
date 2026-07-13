import React, { useState } from 'react';
import { Box, Typography, Paper, Grid, Button, Chip, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const ManagerPortal = () => {
  const [leaves, setLeaves] = useState([
    { id: 1, name: 'Alice Smith', type: 'Sick Leave', dates: '14-Jul to 15-Jul', status: 'Pending' },
    { id: 2, name: 'Bob Jones', type: 'Casual Leave', dates: '20-Jul to 22-Jul', status: 'Pending' },
  ]);

  const handleApprove = (id) => {
    setLeaves(leaves.map(l => l.id === id ? { ...l, status: 'Approved' } : l));
  };

  const handleReject = (id) => {
    setLeaves(leaves.map(l => l.id === id ? { ...l, status: 'Rejected' } : l));
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>Manager Portal</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Pending Team Leaves</Typography>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Employee</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Dates</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leaves.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.type}</TableCell>
                    <TableCell>{row.dates}</TableCell>
                    <TableCell>
                      <Chip 
                        label={row.status} 
                        color={row.status === 'Approved' ? 'success' : row.status === 'Rejected' ? 'error' : 'warning'} 
                        size="small" 
                      />
                    </TableCell>
                    <TableCell align="right">
                      {row.status === 'Pending' && (
                        <>
                          <Button size="small" color="success" onClick={() => handleApprove(row.id)}>Approve</Button>
                          <Button size="small" color="error" onClick={() => handleReject(row.id)}>Reject</Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ManagerPortal;
