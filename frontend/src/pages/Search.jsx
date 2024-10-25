import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useState } from "react";
import 'leaflet/dist/leaflet.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';

export default function Search() {
  const busNumbers = ['Q22', 'M94', 'S53', 'Bx7', 'B42'];

  const busStops = {
    Q22: [
      { name: 'Beach 116 St', position: [40.57833, -73.83642], id: 1 },
      { name: 'Beach 105 St', position: [40.58000, -73.82837], id: 2 },
      { name: 'Beach 98 St', position: [40.58253, -73.82098], id: 3 },
      { name: 'Rockaway Blvd', position: [40.59778, -73.78604], id: 4 }
    ],
    M94: [
      { name: 'York Ave', position: [40.76135, -73.95786], id: 5 },
      { name: 'Lexington Ave', position: [40.76449, -73.97169], id: 6 },
      { name: 'Park Ave', position: [40.76599, -73.97332], id: 7 },
      { name: 'Madison Ave', position: [40.76479, -73.97200], id: 8 }
    ],
    S53: [
      { name: 'Victory Blvd', position: [40.63278, -74.14158], id: 9 },
      { name: 'Clove Rd', position: [40.61199, -74.09667], id: 10 },
      { name: 'Bay Ridge Ave', position: [40.62611, -74.02972], id: 11 },
      { name: '4th Ave', position: [40.63639, -74.02250], id: 12 }
    ],
    Bx7: [
      { name: 'Broadway & W 225 St', position: [40.87413, -73.90926], id: 13 },
      { name: 'Broadway & W 230 St', position: [40.87773, -73.90915], id: 14 },
      { name: 'Broadway & W 242 St', position: [40.88931, -73.89894], id: 15 },
      { name: 'Riverdale Ave & W 261 St', position: [40.90713, -73.90486], id: 16 }
    ],
    B42: [
      { name: 'Rockaway Pkwy & Glenwood Rd', position: [40.64488, -73.90596], id: 17 },
      { name: 'Rockaway Pkwy & Ave D', position: [40.64698, -73.90957], id: 18 },
      { name: 'Rockaway Pkwy & Flatlands Ave', position: [40.64093, -73.90186], id: 19 },
      { name: 'Rockaway Pkwy & Seaview Ave', position: [40.63332, -73.89836], id: 20 }
    ]
  };

  const [selectedBus, setSelectedBus] = useState(null);
  const [selectedStop, setSelectedStop] = useState(null);
  const [nextStopDistance, setNextStopDistance] = useState(null);
  const [timetableData, setTimetableData] = useState(null);
  const defaultPosition = [40.7369754, -73.9159979];

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 3958.8;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const handleBusSelect = (event, value) => {
    setSelectedBus(value);
    setSelectedStop(null);
    setNextStopDistance(null);
    setTimetableData(null);
  };

  const handleStopClick = (stop, index) => {
    setSelectedStop(stop);
    fetchTimetableData(stop.id);

    const stops = busStops[selectedBus];
    if (index + 1 < stops.length) {
      const nextStop = stops[index + 1];
      const distance = calculateDistance(
          stop.position[0], stop.position[1],
          nextStop.position[0], nextStop.position[1]
      );
      setNextStopDistance(distance.toFixed(2));
    } else {
      setNextStopDistance(null);
    }
  };

  const fetchTimetableData = () => {
    axios.get('http://localhost:8080/api/buses')
        .then((response) => {
          console.log('Fetched timetable data:', response.data);
          setTimetableData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching timetable data:', error);
        });
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
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
              {busStops[selectedBus].map((stop, index) => (
                  <li
                      key={index}
                      onClick={() => handleStopClick(stop, index)}
                      style={{
                        cursor: 'pointer',
                        padding: '10px 0',
                        borderBottom: '1px solid #ccc',
                        color: '#007bff',
                        transition: 'color 0.3s'
                      }}
                      onMouseOver={(e) => (e.target.style.color = '#0056b3')}
                      onMouseOut={(e) => (e.target.style.color = '#007bff')}
                  >
                    {stop.name}
                  </li>
              ))}
            </ul>
        )}

        <MapContainer
            center={selectedStop ? selectedStop.position : defaultPosition}
            zoom={selectedStop ? 14 : 12}
            style={{ height: '700px', width: '100%', marginTop: '1rem' }}
        >
          <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {selectedStop && (
              <Marker position={selectedStop.position}>
                <Popup>
                  {selectedStop.name}
                  {nextStopDistance && <div>Next stop in {nextStopDistance} Miles</div>}
                  {timetableData && (
                      <div>
                        <p><strong>Bus Number:</strong> {timetableData.busNumber}</p>
                        <p><strong>Departure:</strong> {timetableData.departure}</p>
                        <p><strong>Arrival:</strong> {timetableData.arrival}</p>
                        <p><strong>From:</strong> {timetableData.fromStopName}</p>
                        <p><strong>To:</strong> {timetableData.toStopName}</p>
                        <p><strong>Segment:</strong> {timetableData.segment}</p>
                      </div>
                  )}
                </Popup>
              </Marker>
          )}
        </MapContainer>
      </div>
  );
}
