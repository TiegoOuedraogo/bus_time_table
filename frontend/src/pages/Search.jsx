import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import {useState} from "react";
import 'leaflet/dist/leaflet.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';

export default function Search() {
  const busNumbers = ['Q22', 'M94', 'S53', 'Bx7', 'B42'];

  const busStops = {
    Q22: [
      { name: 'Beach 116 St', position: [40.57833, -73.83642] },
      { name: 'Beach 105 St', position: [40.58000, -73.82837] },
      { name: 'Beach 98 St', position: [40.58253, -73.82098] },
      { name: 'Rockaway Blvd', position: [40.59778, -73.78604] }
    ],
    M94: [
      { name: 'York Ave', position: [40.76135, -73.95786] },
      { name: 'Lexington Ave', position: [40.76449, -73.97169] },
      { name: 'Park Ave', position: [40.76599, -73.97332] },
      { name: 'Madison Ave', position: [40.76479, -73.97200] }
    ],
    S53: [
      { name: 'Victory Blvd', position: [40.63278, -74.14158] },
      { name: 'Clove Rd', position: [40.61199, -74.09667] },
      { name: 'Bay Ridge Ave', position: [40.62611, -74.02972] },
      { name: '4th Ave', position: [40.63639, -74.02250] }
    ],
    Bx7: [
      { name: 'Broadway & W 225 St', position: [40.87413, -73.90926] },
      { name: 'Broadway & W 230 St', position: [40.87773, -73.90915] },
      { name: 'Broadway & W 242 St', position: [40.88931, -73.89894] },
      { name: 'Riverdale Ave & W 261 St', position: [40.90713, -73.90486] }
    ],
    B42: [
      { name: 'Rockaway Pkwy & Glenwood Rd', position: [40.64488, -73.90596] },
      { name: 'Rockaway Pkwy & Ave D', position: [40.64698, -73.90957] },
      { name: 'Rockaway Pkwy & Flatlands Ave', position: [40.64093, -73.90186] },
      { name: 'Rockaway Pkwy & Seaview Ave', position: [40.63332, -73.89836] }
    ]
  };

  const [selectedBus, setSelectedBus] = useState(null);
  const [selectedStop, setSelectedStop] = useState(null);
  const defaultPosition = [40.7369754,-73.9159979];

  const handleBusSelect = (event, value) => {
    setSelectedBus(value);
    setSelectedStop(null);
  };

  const handleStopClick = (stop) => {
    setSelectedStop(stop);
  };

  return (
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" sx={{ background: 'black', marginBottom: '1rem' }}>
            <Toolbar>
              <IconButton size="large" edge="start" color="inherit" aria-label="menu">
                <DepartureBoardIcon sx={{ margin: 0 }} />
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
            onChange={handleBusSelect}
            sx={{ width: '40vw', marginBottom: '1rem' }}
            renderInput={(params) => <TextField {...params} label="Bus Route" />}
        />
        <small>TIP: Enter an intersection, bus route or bus stop code.</small>

        {selectedBus && busStops[selectedBus] && (
            <Paper elevation={3} sx={{ maxHeight: '200px', overflow: 'auto', width: '40vw', margin: '1rem 0' }}>
              <List>
                {busStops[selectedBus].map((stop, index) => (
                    <ListItem
                        key={index}
                        button
                        onClick={() => handleStopClick(stop)}
                    >
                      <ListItemText primary={stop.name} />
                    </ListItem>
                ))}
              </List>
            </Paper>
        )}

        <MapContainer
            center={selectedStop ? selectedStop.position : defaultPosition}
            zoom={selectedStop ? 14 : 12}
            style={{ height: '500px', width: '100%', marginTop: '1rem' }}
        >
          <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {selectedStop && (
              <Marker position={selectedStop.position}>
                <Popup>{selectedStop.name}</Popup>
              </Marker>
          )}
        </MapContainer>
      </div>
  );
}
