import React, { useState, useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { 
  AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, 
  ListItemText, Box, Button, IconButton, Avatar, Badge, useTheme, useMediaQuery,
  Menu, MenuItem as DropdownItem, Divider 
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PaidIcon from '@mui/icons-material/Paid';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import PersonOutlineIcon from '@mui/icons-material/PersonOutlined';
import { ColorModeContext } from '../theme/ThemeContext';

const drawerWidth = 240;

const DashboardLayout = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(true);

  // Notification Menu State
  const [anchorEl, setAnchorEl] = useState(null);
  const openNotif = Boolean(anchorEl);

  const handleDrawerToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setDesktopOpen(!desktopOpen);
    }
  };

  const handleNotifClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleNotifClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Toolbar /> {/* Spacer for AppBar */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3, transition: 'all 0.3s' }}>
        <Avatar src="https://i.pravatar.cc/150?img=11" sx={{ width: desktopOpen ? 80 : 40, height: desktopOpen ? 80 : 40, mb: desktopOpen ? 1 : 0 }} />
        {desktopOpen && (
          <>
            <Typography variant="subtitle1" fontWeight="bold">Divyanshu Kumar</Typography>
            <Typography variant="body2" color="text.secondary">Software Developer</Typography>
          </>
        )}
      </Box>
      <Divider />
      <Box sx={{ overflow: 'auto', flexGrow: 1 }}>
        <List>
          <ListItem button onClick={() => { navigate('/dashboard'); if (isMobile) setMobileOpen(false); }} sx={{ justifyContent: desktopOpen ? 'initial' : 'center', px: 2.5 }}>
            <ListItemIcon sx={{ minWidth: 0, mr: desktopOpen ? 2 : 'auto', justifyContent: 'center' }}><DashboardIcon color="primary" /></ListItemIcon>
            {desktopOpen && <ListItemText primary="Dashboard" />}
          </ListItem>
          <ListItem button onClick={() => { navigate('/dashboard/employees'); if (isMobile) setMobileOpen(false); }} sx={{ justifyContent: desktopOpen ? 'initial' : 'center', px: 2.5 }}>
            <ListItemIcon sx={{ minWidth: 0, mr: desktopOpen ? 2 : 'auto', justifyContent: 'center' }}><PeopleIcon color="primary" /></ListItemIcon>
            {desktopOpen && <ListItemText primary="Employees" />}
          </ListItem>
          <ListItem button onClick={() => { navigate('/dashboard/attendance'); if (isMobile) setMobileOpen(false); }} sx={{ justifyContent: desktopOpen ? 'initial' : 'center', px: 2.5 }}>
            <ListItemIcon sx={{ minWidth: 0, mr: desktopOpen ? 2 : 'auto', justifyContent: 'center' }}><AccessTimeIcon color="primary" /></ListItemIcon>
            {desktopOpen && <ListItemText primary="Attendance (WFH)" />}
          </ListItem>
          <ListItem button onClick={() => { navigate('/dashboard/payroll'); if (isMobile) setMobileOpen(false); }} sx={{ justifyContent: desktopOpen ? 'initial' : 'center', px: 2.5 }}>
            <ListItemIcon sx={{ minWidth: 0, mr: desktopOpen ? 2 : 'auto', justifyContent: 'center' }}><PaidIcon color="primary" /></ListItemIcon>
            {desktopOpen && <ListItemText primary="Salary & Payroll" />}
          </ListItem>
          <ListItem button onClick={() => { navigate('/dashboard/calendar'); if (isMobile) setMobileOpen(false); }} sx={{ justifyContent: desktopOpen ? 'initial' : 'center', px: 2.5 }}>
            <ListItemIcon sx={{ minWidth: 0, mr: desktopOpen ? 2 : 'auto', justifyContent: 'center' }}><CalendarMonthIcon color="primary" /></ListItemIcon>
            {desktopOpen && <ListItemText primary="Calendar" />}
          </ListItem>

          {/* Portal Links */}
          <Box sx={{ mt: 2, mb: 1, textAlign: 'center' }}>
            <Typography variant="overline" color="text.secondary">{desktopOpen ? 'PORTALS' : '---'}</Typography>
          </Box>
          <ListItem button onClick={() => { navigate('/dashboard/admin'); if (isMobile) setMobileOpen(false); }} sx={{ justifyContent: desktopOpen ? 'initial' : 'center', px: 2.5 }}>
            <ListItemIcon sx={{ minWidth: 0, mr: desktopOpen ? 2 : 'auto', justifyContent: 'center' }}><AdminPanelSettingsIcon color="error" /></ListItemIcon>
            {desktopOpen && <ListItemText primary="Admin Portal" />}
          </ListItem>
          <ListItem button onClick={() => { navigate('/dashboard/hr'); if (isMobile) setMobileOpen(false); }} sx={{ justifyContent: desktopOpen ? 'initial' : 'center', px: 2.5 }}>
            <ListItemIcon sx={{ minWidth: 0, mr: desktopOpen ? 2 : 'auto', justifyContent: 'center' }}><BusinessCenterIcon color="warning" /></ListItemIcon>
            {desktopOpen && <ListItemText primary="HR Portal" />}
          </ListItem>
          <ListItem button onClick={() => { navigate('/dashboard/manager'); if (isMobile) setMobileOpen(false); }} sx={{ justifyContent: desktopOpen ? 'initial' : 'center', px: 2.5 }}>
            <ListItemIcon sx={{ minWidth: 0, mr: desktopOpen ? 2 : 'auto', justifyContent: 'center' }}><AssignmentIndIcon color="success" /></ListItemIcon>
            {desktopOpen && <ListItemText primary="Manager Portal" />}
          </ListItem>
          <ListItem button onClick={() => { navigate('/dashboard/employee-portal'); if (isMobile) setMobileOpen(false); }} sx={{ justifyContent: desktopOpen ? 'initial' : 'center', px: 2.5 }}>
            <ListItemIcon sx={{ minWidth: 0, mr: desktopOpen ? 2 : 'auto', justifyContent: 'center' }}><PersonOutlineIcon color="info" /></ListItemIcon>
            {desktopOpen && <ListItemText primary="Employee Portal" />}
          </ListItem>
        </List>
      </Box>
      <Divider />
      <Box sx={{ p: desktopOpen ? 2 : 1, display: 'flex', justifyContent: 'center' }}>
        {desktopOpen ? (
          <Button fullWidth color="error" onClick={handleLogout} startIcon={<LogoutIcon />} variant="outlined">
            Logout
          </Button>
        ) : (
          <IconButton color="error" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        )}
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary' }}>
      {/* Header */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: 'background.paper', color: 'text.primary', boxShadow: 1 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              Enterprise HRMS
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
              {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <IconButton color="inherit" onClick={handleNotifClick}>
              <Badge badgeContent={4} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={openNotif}
              onClose={handleNotifClose}
              PaperProps={{ sx: { width: 300, mt: 1.5 } }}
            >
              <Box sx={{ p: 2, pb: 1 }}><Typography variant="subtitle1" fontWeight="bold">Notifications</Typography></Box>
              <Divider />
              <DropdownItem onClick={handleNotifClose}>
                <Typography variant="body2">Leave request approved</Typography>
              </DropdownItem>
              <DropdownItem onClick={handleNotifClose}>
                <Typography variant="body2">Payslip for July generated</Typography>
              </DropdownItem>
              <DropdownItem onClick={handleNotifClose}>
                <Typography variant="body2">Reminder: Complete Appraisal</Typography>
              </DropdownItem>
              <DropdownItem onClick={handleNotifClose}>
                <Typography variant="body2">New company policy updated</Typography>
              </DropdownItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : desktopOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }} // Better open performance on mobile.
        sx={{
          width: isMobile ? drawerWidth : (desktopOpen ? drawerWidth : 65),
          flexShrink: 0,
          whiteSpace: 'nowrap',
          boxSizing: 'border-box',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          [`& .MuiDrawer-paper`]: { 
            width: isMobile ? drawerWidth : (desktopOpen ? drawerWidth : 65), 
            boxSizing: 'border-box', 
            borderRight: '1px solid rgba(0,0,0,0.1)', 
            boxShadow: 'none',
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ 
        flexGrow: 1, 
        p: { xs: 2, md: 3 },
        width: { sm: `calc(100% - ${desktopOpen ? drawerWidth : 65}px)` },
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
