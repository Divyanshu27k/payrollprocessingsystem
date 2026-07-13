import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './components/DashboardLayout';

import DashboardOverview from './pages/DashboardOverview';
import EmployeesPage from './pages/EmployeesPage';
import AttendancePage from './pages/AttendancePage';
import PayrollPage from './pages/PayrollPage';

import AdminPortal from './pages/portals/AdminPortal';
import HRPortal from './pages/portals/HRPortal';
import ManagerPortal from './pages/portals/ManagerPortal';
import EmployeePortal from './pages/portals/EmployeePortal';
import CalendarScreen from './pages/CalendarScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardOverview />} />
          <Route path="employees" element={<EmployeesPage />} />
          <Route path="attendance" element={<AttendancePage />} />
          <Route path="payroll" element={<PayrollPage />} />
          <Route path="calendar" element={<CalendarScreen />} />
          
          <Route path="admin" element={<AdminPortal />} />
          <Route path="hr" element={<HRPortal />} />
          <Route path="manager" element={<ManagerPortal />} />
          <Route path="employee-portal" element={<EmployeePortal />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
