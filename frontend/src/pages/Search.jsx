import React, { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Box } from "@mui/material";
import Zoom from '@mui/material/Zoom';

const MTABusApp = () => {
    const [buses, setBuses] = useState([]);
    const [selectedBus, setSelectedBus] = useState(null);
    const [stops, setStops] = useState([]);
    const [selectedStop, setSelectedStop] = useState(null);
    const [nextBusArrivals, setNextBusArrivals] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/buses')
            .then(response => response.json())
            .then(data => setBuses(data));
    }, []);

    useEffect(() => {
        if (selectedBus) {
            fetch(`http://localhost:8080/api/stops`)
                .then(response => response.json())
                .then(data => setStops(data));
        }
    }, [selectedBus]);

    useEffect(() => {
        if (selectedStop) {
            fetch(`http://localhost:8080/api/timetables/buses/${selectedStop.id}`)
                .then(response => response.json())
                .then(data => {
                    console.log('Next bus arrivals:', data);
                    setNextBusArrivals(data);
                })
        }
    }, [selectedStop]);

    const handleBusSelect = (event, value) => {
        setSelectedBus(value);
    };

    const handleStopSelect = (stop) => {
        setSelectedStop(stop);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{ background: 'black', marginBottom: '1rem' }}>
                    <Toolbar>
                        <IconButton size="large" edge="start" color="inherit" aria-label="menu">
                            <DepartureBoardIcon sx={{ margin: 0 }} />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            MTA Bus App
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>

            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom: '1rem' }}>
                <Autocomplete
                    autoSelect
                    blurOnSelect
                    disablePortal
                    options={buses}
                    getOptionLabel={(option) => `${option.busNumber} (${option.status})`}
                    onChange={handleBusSelect}
                    sx={{ width: '40vw', marginRight: '1rem' }}
                    renderInput={(params) => <TextField {...params} label="Bus Route" />}
                    renderOption={(props, option) => (
                        <li {...props} key={option.id}>
                            <Typography
                                component="span"
                                sx={{
                                    color: option.status === 'INSERVICE' ? ' #79b176' : '#d3494eed',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    width: '100%'
                                }}
                            >
                                <span>{option.busNumber}</span>
                                <span>{option.status}</span>
                            </Typography>
                        </li>
                    )}
                />
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
                <div style={{ flex: 1, overflowY: 'auto' }}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Stops</Typography>
                            {stops.length > 0 ? (
                                <List>
                                    {stops.map((stop) => (
                                        <ListItem
                                            key={stop.id}
                                            component="div"
                                            onClick={() => handleStopSelect(stop)}
                                            selected={selectedStop === stop}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <ListItemText primary={stop.stopName} />
                                        </ListItem>
                                    ))}
                                </List>
                            ) : (
                                <Typography variant="body1">No stops available for the selected bus.</Typography>
                            )}
                        </CardContent>
                    </Card>
                </div>
                {selectedStop && (
                    <div style={{ flex: 1, overflowY: 'auto', marginLeft: '1rem' }}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">Next Buses Arrival Time</Typography>
                                {nextBusArrivals.length > 0 ? (
                                    <List>
                                        {nextBusArrivals.map((arrival, index) => (
                                            <ListItem
                                                key={`${arrival.busNumber}-${index}`}
                                                component="div"
                                            >
                                                <ListItemText
                                                    primary={`Bus ${arrival.busNumber} arriving in ${index + 1} ${index === 0 ? 'minute' : 'minutes'}`}
                                                    secondary={arrival.arrivalTime}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                ) : (
                                    <Typography variant="body1">No upcoming bus arrivals for this stop.</Typography>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MTABusApp;