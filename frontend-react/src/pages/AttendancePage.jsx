import React, { useState } from 'react';
import { 
  Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Button, Chip 
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import EventBusyIcon from '@mui/icons-material/EventBusy';

const initialAttendance = [
  { id: 1, empId: 'EMP001', name: 'John Doe', date: '2026-07-13', status: 'Present (WFO)', checkIn: '08:55 AM', checkOut: '06:05 PM' },
  { id: 2, empId: 'EMP002', name: 'Jane Smith', date: '2026-07-13', status: 'Present (WFH)', checkIn: '09:05 AM', checkOut: '06:30 PM' },
  { id: 3, empId: 'EMP003', name: 'Michael Johnson', date: '2026-07-13', status: 'On Leave', checkIn: '-', checkOut: '-' },
  { id: 4, empId: 'EMP004', name: 'Emily Davis', date: '2026-07-13', status: 'Present (WFO)', checkIn: '08:45 AM', checkOut: '05:45 PM' },
];

const AttendancePage = () => {
  const [attendance, setAttendance] = useState(initialAttendance);

  const getStatusIcon = (status) => {
    if (status.includes('WFO')) return <CheckCircleIcon fontSize="small" sx={{ mr: 1 }} />;
    if (status.includes('WFH')) return <LaptopMacIcon fontSize="small" sx={{ mr: 1 }} />;
    return <EventBusyIcon fontSize="small" sx={{ mr: 1 }} />;
  };

  const getStatusColor = (status) => {
    if (status.includes('WFO')) return 'success';
    if (status.includes('WFH')) return 'info';
    return 'warning';
  };

  const handleCheckIn = (type) => {
    const newRecord = {
      id: Date.now(),
      empId: 'EMP005', // Assume logged in user
      name: 'Current User',
      date: new Date().toISOString().split('T')[0],
      status: `Present (${type})`,
      checkIn: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      checkOut: '-'
    };
    setAttendance([newRecord, ...attendance]);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#1e293b' }}>
          Daily Attendance Tracker
        </Typography>
        <Box>
          <Button variant="outlined" color="primary" sx={{ mr: 2, borderRadius: 2 }} onClick={() => handleCheckIn('WFH')}>
            Mark WFH
          </Button>
          <Button variant="contained" color="success" sx={{ borderRadius: 2 }} onClick={() => handleCheckIn('WFO')}>
            Check In (WFO)
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ bgcolor: '#f8fafc' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 600, color: '#475569' }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#475569' }}>Employee</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#475569' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#475569' }}>Check-In Time</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#475569' }}>Check-Out Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendance.map((row) => (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: '#f1f5f9' } }}>
                <TableCell component="th" scope="row" sx={{ fontWeight: 500 }}>{row.date}</TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>{row.name}</Typography>
                  <Typography variant="caption" color="text.secondary">{row.empId}</Typography>
                </TableCell>
                <TableCell>
                  <Chip 
                    icon={getStatusIcon(row.status)} 
                    label={row.status} 
                    color={getStatusColor(row.status)} 
                    variant={row.status === 'On Leave' ? 'outlined' : 'filled'}
                    size="small" 
                    sx={{ fontWeight: 500 }} 
                  />
                </TableCell>
                <TableCell>{row.checkIn}</TableCell>
                <TableCell>{row.checkOut}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AttendancePage;
