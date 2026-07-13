import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Button, Chip, IconButton, Dialog, DialogTitle, 
  DialogContent, DialogActions, TextField, MenuItem, FormControlLabel, Checkbox, Grid, Divider, Avatar
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

// Ensure we use the relative path so the Vite proxy handles it
// This fixes the "mobile device" connection issue by routing through the host IP
const API_URL = '/api/v1/employees';

const validationSchema = Yup.object({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  department: Yup.string().required('Department is required'),
  designation: Yup.string().required('Designation is required'),
  status: Yup.string().required('Status is required'),
  officialEmail: Yup.string().email('Invalid email')
});

const EmployeesPage = () => {
  const [employees, setEmployees] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(API_URL);
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      dob: '',
      bloodGroup: '',
      gender: '',
      phone: '',
      department: '',
      designation: '',
      officialEmail: '',
      salaryStructure: '',
      shift: '',
      reportingManager: '',
      status: 'Active',
      receivesCredentials: false
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        // Clean up empty strings for date fields so backend doesn't throw parsing errors
        const payload = { ...values };
        if (payload.dob === '') payload.dob = null;
        
        if (editingId) {
          await axios.put(`${API_URL}/${editingId}`, payload);
        } else {
          await axios.post(API_URL, payload);
        }
        fetchEmployees();
        handleClose();
        resetForm();
      } catch (error) {
        console.error('Error saving employee:', error.response?.data || error);
        alert(`Failed to save employee: ${error.response?.data?.message || error.message}`);
      }
    },
  });

  const [previewImage, setPreviewImage] = useState(null);

  const handleOpen = (employee = null) => {
    // Check if employee is an event object (e.g., from button onClick)
    if (employee && !employee.target) {
      setEditingId(employee.empCode);
      formik.setValues({
        ...formik.initialValues,
        ...employee,
        dob: employee.dob || ''
      });
    } else {
      setEditingId(null);
      formik.resetForm();
    }
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    formik.resetForm();
    setEditingId(null);
    setPreviewImage(null);
  };

  const handleDelete = async (empCode) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await axios.delete(`${API_URL}/${empCode}`);
        fetchEmployees();
      } catch (error) {
        console.error('Error deleting employee:', error.response?.data || error);
        alert(`Failed to delete employee: ${error.response?.data?.message || error.message}`);
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'success';
      case 'On Leave': return 'warning';
      case 'Terminated': return 'error';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#1e293b' }}>
          Employee Directory
        </Typography>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} sx={{ borderRadius: 2 }} onClick={() => handleOpen()}>
          Add Employee
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ bgcolor: '#f8fafc' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 600, color: '#475569' }}>Employee ID</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#475569' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#475569' }}>Department</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#475569' }}>Designation</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#475569' }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#475569' }}>Status</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600, color: '#475569' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((row) => (
              <TableRow key={row.empCode} sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: '#f1f5f9' } }}>
                <TableCell component="th" scope="row" sx={{ fontWeight: 500 }}>{row.empCode}</TableCell>
                <TableCell>{row.firstName} {row.lastName}</TableCell>
                <TableCell>{row.department}</TableCell>
                <TableCell>{row.designation}</TableCell>
                <TableCell>{row.officialEmail}</TableCell>
                <TableCell>
                  <Chip label={row.status} color={getStatusColor(row.status)} size="small" sx={{ fontWeight: 500 }} />
                </TableCell>
                <TableCell align="right">
                  <IconButton size="small" color="primary" onClick={() => handleOpen(row)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" color="error" onClick={() => handleDelete(row.empCode)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {employees.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 3, color: 'text.secondary' }}>
                  No employees found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Employee Dialog */}
      <Dialog open={openDialog} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>{editingId ? 'Edit Employee' : 'Add New Employee'}</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent dividers>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 1.5 }}>
              
              {/* Photo Upload */}
              <Box sx={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 1 }}>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="icon-button-file"
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setPreviewImage(URL.createObjectURL(file));
                    }
                  }}
                />
                <label htmlFor="icon-button-file">
                  <IconButton color="primary" aria-label="upload picture" component="span" sx={{ p: 0 }}>
                    <Avatar 
                      src={previewImage || formik.values.photoUrl} 
                      sx={{ width: 60, height: 60, border: '2px solid #e2e8f0', bgcolor: '#f1f5f9' }}
                    >
                      {!previewImage && <PhotoCameraIcon color="action" fontSize="medium" />}
                    </Avatar>
                  </IconButton>
                </label>
                <Typography variant="caption" sx={{ mt: 0.5, color: 'text.secondary' }}>Upload Photo</Typography>
              </Box>

              {/* Personal Information */}
              <Box sx={{ gridColumn: '1 / -1' }}>
                <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 600 }}>Personal Information</Typography>
                <Divider sx={{ mb: 0.5 }} />
              </Box>

              <TextField
                size="small"
                fullWidth
                id="firstName"
                name="firstName"
                label="First Name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
              <TextField
                size="small"
                fullWidth
                id="lastName"
                name="lastName"
                label="Last Name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
              <TextField
                size="small"
                fullWidth
                id="dob"
                name="dob"
                label="Date of Birth"
                type="date"
                InputLabelProps={{ shrink: true }}
                slotProps={{ inputLabel: { shrink: true } }}
                sx={{ '& .MuiInputLabel-root': { transform: 'translate(14px, -9px) scale(0.75)' } }}
                value={formik.values.dob}
                onChange={formik.handleChange}
              />
              <TextField
                size="small"
                fullWidth
                id="gender"
                name="gender"
                label="Gender"
                select
                value={formik.values.gender}
                onChange={formik.handleChange}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
              <TextField
                size="small"
                fullWidth
                id="bloodGroup"
                name="bloodGroup"
                label="Blood Group"
                select
                value={formik.values.bloodGroup}
                onChange={formik.handleChange}
              >
                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => (
                  <MenuItem key={bg} value={bg}>{bg}</MenuItem>
                ))}
              </TextField>

              {/* Contact Details */}
              <Box sx={{ gridColumn: '1 / -1', mt: 0.5 }}>
                <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 600 }}>Contact Details</Typography>
                <Divider sx={{ mb: 0.5 }} />
              </Box>
              
              <TextField
                size="small"
                fullWidth
                id="phone"
                name="phone"
                label="Mobile Number"
                value={formik.values.phone}
                onChange={formik.handleChange}
              />
              <Box sx={{ gridColumn: { xs: '1 / -1', sm: 'span 2' } }}>
                <TextField
                  size="small"
                  fullWidth
                  id="officialEmail"
                  name="officialEmail"
                  label="Official Email"
                  value={formik.values.officialEmail}
                  onChange={formik.handleChange}
                  error={formik.touched.officialEmail && Boolean(formik.errors.officialEmail)}
                  helperText={formik.touched.officialEmail && formik.errors.officialEmail}
                />
              </Box>

              {/* Job Details */}
              <Box sx={{ gridColumn: '1 / -1', mt: 0.5 }}>
                <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 600 }}>Job Details</Typography>
                <Divider sx={{ mb: 0.5 }} />
              </Box>
              
              <TextField
                size="small"
                fullWidth
                id="department"
                name="department"
                label="Department"
                select
                value={formik.values.department}
                onChange={formik.handleChange}
                error={formik.touched.department && Boolean(formik.errors.department)}
                helperText={formik.touched.department && formik.errors.department}
              >
                {['Engineering', 'HR', 'Finance', 'Marketing', 'Sales', 'Operations'].map((option) => (
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
              </TextField>
              <TextField
                size="small"
                fullWidth
                id="designation"
                name="designation"
                label="Designation / Role"
                value={formik.values.designation}
                onChange={formik.handleChange}
                error={formik.touched.designation && Boolean(formik.errors.designation)}
                helperText={formik.touched.designation && formik.errors.designation}
              />
              <TextField
                size="small"
                fullWidth
                id="shift"
                name="shift"
                label="Shift Assigned"
                select
                value={formik.values.shift}
                onChange={formik.handleChange}
              >
                <MenuItem value="General (9 to 5)">General (9 to 5)</MenuItem>
                <MenuItem value="Morning (6 to 2)">Morning (6 to 2)</MenuItem>
                <MenuItem value="Night (8 to 4)">Night (8 to 4)</MenuItem>
              </TextField>
              <TextField
                size="small"
                fullWidth
                id="reportingManager"
                name="reportingManager"
                label="Reporting Manager"
                value={formik.values.reportingManager}
                onChange={formik.handleChange}
              />
              <TextField
                size="small"
                fullWidth
                id="status"
                name="status"
                label="Status"
                select
                value={formik.values.status}
                onChange={formik.handleChange}
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="On Leave">On Leave</MenuItem>
                <MenuItem value="Terminated">Terminated</MenuItem>
              </TextField>

              {/* Payroll & Security */}
              <Box sx={{ gridColumn: '1 / -1', mt: 0.5 }}>
                <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 600 }}>Payroll & Security</Typography>
                <Divider sx={{ mb: 0.5 }} />
              </Box>
              
              <Box sx={{ gridColumn: { xs: '1 / -1', sm: 'span 2' } }}>
                <TextField
                  size="small"
                  fullWidth
                  id="salaryStructure"
                  name="salaryStructure"
                  label="Salary Structure Assigned"
                  select
                  value={formik.values.salaryStructure}
                  onChange={formik.handleChange}
                >
                  <MenuItem value="Tier 1 (Exec)">Tier 1 (Exec)</MenuItem>
                  <MenuItem value="Tier 2 (Mid-Level)">Tier 2 (Mid-Level)</MenuItem>
                  <MenuItem value="Tier 3 (Entry)">Tier 3 (Entry)</MenuItem>
                </TextField>
              </Box>
              <Box sx={{ gridColumn: '1 / -1' }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      id="receivesCredentials"
                      name="receivesCredentials"
                      checked={formik.values.receivesCredentials}
                      onChange={formik.handleChange}
                      color="primary"
                    />
                  }
                  label={<Typography variant="body2">Employee Receives Credentials (Email Invite)</Typography>}
                />
              </Box>

            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={handleClose} color="inherit">Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              {editingId ? 'Save Changes' : 'Create Employee'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default EmployeesPage;
