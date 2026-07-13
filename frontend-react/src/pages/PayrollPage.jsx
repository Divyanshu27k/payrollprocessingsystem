import React from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Chip } from '@mui/material';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const initialPayroll = [
  { id: 'PAY001', empId: 'EMP001', name: 'John Doe', month: 'July 2026', baseSalary: '₹6,50,000', deductions: '₹40,000', netSalary: '₹6,10,000', status: 'Paid' },
  { id: 'PAY002', empId: 'EMP002', name: 'Jane Smith', month: 'July 2026', baseSalary: '₹7,50,000', deductions: '₹50,000', netSalary: '₹7,00,000', status: 'Paid' },
  { id: 'PAY003', empId: 'EMP003', name: 'Michael Johnson', month: 'July 2026', baseSalary: '₹5,80,000', deductions: '₹30,000', netSalary: '₹5,50,000', status: 'Pending' },
];

const PayrollPage = () => {
  const [payroll, setPayroll] = React.useState(initialPayroll);

  const getStatusColor = (status) => {
    return status === 'Paid' ? 'success' : 'warning';
  };

  const handleRunPayroll = () => {
    const updatedPayroll = payroll.map(emp => 
      emp.status === 'Pending' ? { ...emp, status: 'Paid' } : emp
    );
    setPayroll(updatedPayroll);
    alert('Payroll processed successfully for all pending employees!');
  };

  const handleDownloadPayslip = (employee) => {
    const doc = new jsPDF();
    
    // Add Company Header
    doc.setFontSize(22);
    doc.setTextColor(30, 64, 175); // Blue color
    doc.text('ENTERPRISE HRMS', 105, 20, { align: 'center' });
    
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text('Official Payslip', 105, 30, { align: 'center' });
    
    // Add Employee Details
    doc.setFontSize(12);
    doc.text(`Employee Name: ${employee.name}`, 20, 50);
    doc.text(`Employee ID: ${employee.empId}`, 20, 60);
    doc.text(`Month: ${employee.month}`, 140, 50);
    doc.text(`Status: ${employee.status}`, 140, 60);
    
    // Add Salary Table
    autoTable(doc, {
      startY: 75,
      head: [['Description', 'Amount']],
      body: [
        ['Base Salary', employee.baseSalary],
        ['Deductions', employee.deductions],
      ],
      foot: [['NET SALARY', employee.netSalary]],
      theme: 'grid',
      headStyles: { fillColor: [30, 64, 175] },
      footStyles: { fillColor: [240, 240, 240], textColor: [0, 0, 0], fontStyle: 'bold' }
    });
    
    // Footer
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('This is a computer generated document. No signature is required.', 105, doc.lastAutoTable.finalY + 30, { align: 'center' });

    doc.save(`Payslip_${employee.name.replace(/ /g, '_')}_${employee.month.replace(/ /g, '_')}.pdf`);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#1e293b' }}>
          Salary & Payroll Management
        </Typography>
        <Button variant="contained" color="primary" startIcon={<CurrencyRupeeIcon />} sx={{ borderRadius: 2 }} onClick={handleRunPayroll}>
          Run Payroll
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ bgcolor: '#f8fafc' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 600, color: '#475569' }}>Employee</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#475569' }}>Month</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#475569' }}>Base Salary</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#475569' }}>Deductions</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#475569' }}>Net Salary</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#475569' }}>Status</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600, color: '#475569' }}>Payslip</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payroll.map((row) => (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: '#f1f5f9' } }}>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>{row.name}</Typography>
                  <Typography variant="caption" color="text.secondary">{row.empId}</Typography>
                </TableCell>
                <TableCell>{row.month}</TableCell>
                <TableCell>{row.baseSalary}</TableCell>
                <TableCell sx={{ color: 'error.main' }}>{row.deductions}</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#0f172a' }}>{row.netSalary}</TableCell>
                <TableCell>
                  <Chip label={row.status} color={getStatusColor(row.status)} size="small" sx={{ fontWeight: 500 }} />
                </TableCell>
                <TableCell align="right">
                  <Button size="small" variant="outlined" startIcon={<FileDownloadIcon />} sx={{ borderRadius: 2 }} onClick={() => handleDownloadPayslip(row)}>
                    Download
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PayrollPage;
