import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const TimeTable = () => {
    const [timetable, setTimetable] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/timetables')
            .then(response => response.json())
            .then(data => {
                console.log("Fetched timetable data:", data); // For debugging
                setTimetable(data);
            })
            .catch(error => console.error("Error fetching timetable data:", error));
    }, []);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
            <TableContainer component={Paper} sx={{ marginTop: "2rem", boxShadow: 3, width: '80%' }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#f0f0f0" }}>
                            <TableCell>Bus Number</TableCell>
                            <TableCell>Arrival Time</TableCell>
                            <TableCell>Departure Time</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {timetable.length > 0 ? (
                            timetable.map((entry, index) => (
                                <TableRow key={entry.id} hover>
                                    <TableCell>{entry.busId}</TableCell>
                                    <TableCell>{entry.arrival}</TableCell>
                                    <TableCell>{entry.departure}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3} align="center">
                                    No timetable data available.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default TimeTable;
