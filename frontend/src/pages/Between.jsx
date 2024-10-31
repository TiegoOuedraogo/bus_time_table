import Container from '@mui/material/Container';
import { useState } from 'react';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormGroup from '@mui/material/FormGroup';


const Between = () => {
  const [selectedStop, setSelectedStop ]= useState(0);
  const stops = [1,2,3,4,5,6,7,8,9,10];
  const handleSubmit = (e) => {
    e.preventDefault();
  }
  const handleStopSelect = (stop) => {
    setSelectedStop(stop);
  };
  return(
    <div>
      <Link to="/"><Button variant="text" sx={{ color: 'black' }} > &lt; Back</Button></Link>
      <FormGroup onSubmit={handleSubmit}>
        <FormControl fullWidth>
          <InputLabel id="stop1-select-label">Stops</InputLabel>
          <Select
            labelId="stop1-select-label"
            id="stop1-select"
            value={selectedStop}
            label="Stops"
            onChange={handleStopSelect}
          >
            {stops.filter((stop) => stop !== selectedStop).map((stop) => (
              <MenuItem value={stop}>{stop}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="stop2-select-label">Stops</InputLabel>
          <Select
            labelId="stop2-select-label"
            id="stop2-select"
            value={selectedStop}
            label="Stops"
            onChange={handleStopSelect}
          >
            {stops.filter((stop) => stop !== selectedStop).map((stop) => (
              <MenuItem value={stop}>{stop}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </FormGroup>
    </div>
  );
};

export default Between;