import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';
import IconButton from '@mui/material/IconButton';

export default function Search() {
  const busNumbers = ['Q22', 'M94', 'S53', 'Bx7', 'B42'];
 
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ background: 'black', marginBottom: '1rem' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            
          >
            <DepartureBoardIcon sx={{margin: 0}}/>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            BusTime
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
      <Autocomplete
      disablePortal
      options={busNumbers}
      sx={{ width: '40vw' }}
      renderInput={(params) => <TextField {...params} label="Bus Route" />}
    />
    <small>TIP: Enter an intersection, bus route or bus stop code.</small>
    </div>
  );
}