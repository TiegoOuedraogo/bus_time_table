import { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Grow } from "@mui/material";
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

    const formatTime = (timeString) => {
        // Assumes timeString is in "HH:MM:SS" format, converting to 12-hour format
        const [hours, minutes] = timeString.split(':');
        const date = new Date();
        date.setHours(parseInt(hours, 10));
        date.setMinutes(parseInt(minutes, 10));
        return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
    };

    const calculateMinutesRemaining = (arrivalTime) => {
        const now = new Date();
        const arrivalDate = new Date();
        const [hours, minutes] = arrivalTime.split(':');
        arrivalDate.setHours(parseInt(hours, 10));
        arrivalDate.setMinutes(parseInt(minutes, 10));
        arrivalDate.setSeconds(0);

        let diffMs = arrivalDate - now;

        // If arrival time is earlier than now, it means it is for the next day
        if (diffMs < 0) {
            arrivalDate.setDate(arrivalDate.getDate() + 1);
            diffMs = arrivalDate - now;
        }

        return Math.max(0, Math.round(diffMs / 60000)); // Convert milliseconds to minutes
    };

    useEffect(() => {
        fetch('http://localhost:8080/api/buses')
            .then(response => response.json())
            .then(data => setBuses(data));
        console.log("Fetched buses:", buses);
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
                        console.log("Fetched stops:", data.stops);
                        setStops(data.stops);
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
        console.log("Selected bus:", value);
    };

    const handleStopSelect = (stop) => {
        setSelectedStop(stop);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
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
                                    color: '#2E2E2E',
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
                            {stops.length > 0 && selectedBus.status !== 'Inactive' && selectedBus.status !== 'Maintenance' ? (
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
                                                        primary={`Bus ${arrival.busNumber} arriving at ${formatTime(arrival.arrivalTime)}`}
                                                        secondary={`(${calculateMinutesRemaining(arrival.arrivalTime)} min remaining)`}
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
