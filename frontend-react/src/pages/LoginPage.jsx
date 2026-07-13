import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login for now
    if (email && password) {
      navigate('/dashboard');
    }
  };

  return (
    <Box className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Paper elevation={3} className="p-8 w-full max-w-md">
        <Typography variant="h4" component="h1" className="text-center font-bold text-gray-800 mb-6">
          HRMS Portal
        </Typography>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <TextField
            label="Email Address"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
          />
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            size="large"
            className="mt-4 bg-blue-600 hover:bg-blue-700"
          >
            Sign In
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default LoginPage;
