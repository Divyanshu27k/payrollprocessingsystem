import React, { useState } from 'react';
import { Box, Typography, Paper, useTheme } from '@mui/material';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const events = [
  {
    id: 1,
    title: 'Company Town Hall',
    start: new Date(2026, 6, 15, 10, 0), // July 15, 2026
    end: new Date(2026, 6, 15, 11, 30),
    allDay: false,
  },
  {
    id: 2,
    title: 'Public Holiday (Independence Day)',
    start: new Date(2026, 7, 15), // Aug 15, 2026
    end: new Date(2026, 7, 15),
    allDay: true,
  },
  {
    id: 3,
    title: 'Payroll Processing Cutoff',
    start: new Date(2026, 6, 25), // July 25, 2026
    end: new Date(2026, 6, 25),
    allDay: true,
  },
];

const CalendarScreen = () => {
  const theme = useTheme();
  
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>Company Calendar</Typography>
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Box sx={{ height: 600 }}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ 
              height: '100%', 
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.text.primary 
            }}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default CalendarScreen;
