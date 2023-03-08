import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import './Navbar.css'

function Navbar() {
  return (
    <>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Box style={{ cursor: 'pointer' }}>
            <Typography variant="h5" color="inherit">
              BlogPessoal
            </Typography>
          </Box>

          <Box display="flex" width='100%' justifyContent="space-between" className='navbarLink'>
            <Box display='flex'>
              <Box mx={1} style={{ cursor: 'pointer' }}>
              <Link to='/home'>
              <Typography variant="h6" color="inherit">
                home
              </Typography>
              </Link>
            </Box>
            <Box mx={1} style={{ cursor: 'pointer' }}>
              <Link to='/postagens'>
              <Typography variant="h6" color="inherit">
                postagens
              </Typography>
              </Link>
            </Box>
            <Box mx={1} style={{ cursor: 'pointer' }}>
              <Link to='/temas'>
              <Typography variant="h6" color="inherit">
                temas
              </Typography>
              </Link>
            </Box>
            <Box mx={1} style={{ cursor: 'pointer' }}>
              <Typography variant="h6" color="inherit">
                cadastrar tema
              </Typography>
            </Box>
            </Box>
            <Box mx={1} style={{ cursor: 'pointer' }}>
              <Link to='/login'>
                <Typography variant="h6" color="inherit">
                  logout
                </Typography>
              </Link>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar;
