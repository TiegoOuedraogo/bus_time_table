import { useState, useEffect } from "react";
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
import { Box, Grow } from "@mui/material";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Slide from '@mui/material/Slide';

const MTABusApp = () => {
    const [buses, setBuses] = useState([]);
    const [selectedBus, setSelectedBus] = useState(null);
    const [stops, setStops] = useState([]);
    const [selectedStop, setSelectedStop] = useState(null);
    const [nextBusArrivals, setNextBusArrivals] = useState([]);
    const swal = withReactContent(Swal);

    useEffect(() => {
        fetch('http://localhost:8080/api/buses')
            .then(response => response.json())
            .then(data => setBuses(data));
    }, []);

    useEffect(() => {
        setStops([]);
        setSelectedStop(null);
        setNextBusArrivals([]);

        if (selectedBus && selectedBus.id) {
            const url = `http://localhost:8080/api/buses/${selectedBus.id}/route-stops`;
            console.log("Fetching stops from:", url);

            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error: ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(data => {
                    if (data && Array.isArray(data.stops)) {
                        console.log("Fetched stops:", data.stops);  // Log stops array
                        setStops(data.stops);  // Set stops from nested array
                    } else {
                        console.error("Unexpected response format:", data);
                        setStops([]);
                    }
                })
                .catch(error => {
                    console.error("Error fetching stops:", error);
                    setStops([]);
                });
        }
    }, [selectedBus]);


    useEffect(() => {
        if (selectedStop) {
            const url = `http://localhost:8080/api/timetables/buses/${selectedStop.id}`;
            console.log("Fetching next bus arrivals from:", url);

            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error: ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Next bus arrivals:', data);
                    const nextThreeArrivals = data.slice(0, 3);
                    setNextBusArrivals(nextThreeArrivals);

                    if (nextThreeArrivals.length === 0) {
                        swal.fire({
                            title: 'No buses found',
                            text: 'Burn some calories or call an Uber.',
                            icon: 'error',
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true
                        });
                    }
                })
                .catch(error => {
                    console.error("Error fetching next bus arrivals:", error);
                    setNextBusArrivals([]);
                });
        }
    }, [selectedStop]);


    const handleBusSelect = (event, value) => {
        setSelectedBus(value);
        console.log("Selected bus:", value);  // Log selected bus for debugging
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
                                    color: option.status === 'INSERVICE' ? '#79b176' : '#d3494eed',
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
                                        <Grow
                                            in={true}
                                            mountOnEnter
                                            unmountOnExit
                                            key={stop.id}
                                            style={{ transitionDelay: `${stops.indexOf(stop) * 100}ms` }}
                                        >
                                            <ListItem
                                                component="div"
                                                onClick={() => handleStopSelect(stop)}
                                                selected={selectedStop === stop}
                                                sx={{ cursor: 'pointer' }}
                                            >
                                                <ListItemText primary={stop.stopName} />
                                            </ListItem>
                                        </Grow>
                                    ))}
                                </List>
                            ) : (
                                <Typography variant="body1">
                                    {selectedBus && stops.length === 0 ? 'Loading stops...' : 'Select a bus to view stops'}
                                </Typography>
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
                                            <Slide
                                                direction="left"
                                                in={true}
                                                mountOnEnter
                                                unmountOnExit
                                                key={`${arrival.busNumber}-${index}`}
                                                style={{ transitionDelay: `${index * 300}ms` }}
                                            >
                                                <ListItem component="div">
                                                    <ListItemText
                                                        primary={`${arrival.busNumber} arriving in ${index + 1} ${index === 0 ? 'minute' : 'minutes'}`}
                                                        secondary={arrival.arrivalTime}
                                                    />
                                                </ListItem>
                                            </Slide>
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
