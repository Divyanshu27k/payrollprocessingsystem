import React from 'react';
import { Card, CardContent, Typography, Grid, Paper, Box } from '@mui/material';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, AreaChart, Area
} from 'recharts';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const data = [
  { name: 'Jan', attendance: 95, leaves: 5 },
  { name: 'Feb', attendance: 92, leaves: 8 },
  { name: 'Mar', attendance: 98, leaves: 2 },
  { name: 'Apr', attendance: 90, leaves: 10 },
  { name: 'May', attendance: 96, leaves: 4 },
  { name: 'Jun', attendance: 97, leaves: 3 },
];

const salaryData = [
  { name: 'Q1', expense: 120000 },
  { name: 'Q2', expense: 135000 },
  { name: 'Q3', expense: 125000 },
  { name: 'Q4', expense: 140000 },
];

const StatCard = ({ title, value, icon, color }) => (
  <Card sx={{ 
    borderRadius: 3, 
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
    background: `linear-gradient(135deg, ${color} 0%, ${color}CC 100%)`,
    color: 'white',
    transition: 'transform 0.2s',
    '&:hover': { transform: 'translateY(-5px)' }
  }}>
    <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box>
        <Typography variant="subtitle2" sx={{ opacity: 0.9, fontWeight: 500 }}>{title}</Typography>
        <Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }}>{value}</Typography>
      </Box>
      <Box sx={{ opacity: 0.8, transform: 'scale(1.5)', mr: 1 }}>
        {icon}
      </Box>
    </CardContent>
  </Card>
);

const DashboardOverview = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: '#1e293b' }}>
        Dashboard Overview
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total Employees" value="1,245" icon={<PeopleAltIcon fontSize="large" />} color="#3b82f6" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Present Today" value="1,180" icon={<CheckCircleIcon fontSize="large" />} color="#10b981" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="On Leave" value="65" icon={<EventBusyIcon fontSize="large" />} color="#f59e0b" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Avg. Salary Expense" value="$420K" icon={<AccountBalanceWalletIcon fontSize="large" />} color="#8b5cf6" />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#334155' }}>Attendance Trends (Last 6 Months)</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorAttendance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="attendance" stroke="#3b82f6" fillOpacity={1} fill="url(#colorAttendance)" name="Attendance %" />
              </AreaChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#334155' }}>Payroll Expense by Quarter</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salaryData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  cursor={{fill: 'transparent'}}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="expense" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Expense ($)" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardOverview;
