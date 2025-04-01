import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';


import AuthenticatedAppbar, { drawerWidth } from "./AuthenticatedAppbar";
import AuthenticatedDrawer from "./AuthenticatedDrawer";

type AuthenticatedLayoutProps = {
  children: React.ReactNode
}

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const AuthenticatedLayout = () => {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AuthenticatedAppbar handleDrawerOpen={handleDrawerOpen} open={open} />
      <AuthenticatedDrawer handleDrawerClose={handleDrawerClose} close={open} />
      
      <Main open={open} style={{marginTop: '50px'}}>
      <Outlet/>
      </Main>
    </Box>
  );
};

export default AuthenticatedLayout;
