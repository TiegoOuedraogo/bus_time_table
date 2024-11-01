import Container from '@mui/material/Container';
import { useState } from 'react';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormGroup from '@mui/material/FormGroup';
import Zoom from '@mui/material/Zoom';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import axios from 'axios';


const Between = () => {
  const [stopX, setStopX ]= useState(0);
  const [stopY, setStopY ]= useState(0);
  const [time, setTime ]= useState('');
  const stops = [1,2,3,4,5,6,7,8,9,10];
  const swal = withReactContent(Swal);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.get(`http://localhost:8080/api/timetables/buses/betweenstops?stopX=${stopX}&stopY=${stopY}`)
        .then(response => {
        setTime(response.data);
      })
      .catch(error => {
        swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while fetching data',
          confirmButtonText: 'OK'
        })
    })
  }
  const handleStopx = (stop) => {
    setStopX(stop.target.value);
  };
  const handleStopy = (stop) => {
    setStopY(stop.target.value);
  };
  return(
    <div sx={{ display: 'flex', justifyContent: 'center', marginTop: '1rem'}}>
      <form onSubmit={handleSubmit}>
        <FormGroup >
          <FormControl sx={{ m: '2rem' }}>
            <InputLabel id="stop1-select-label">Stops</InputLabel>
            <Select
              labelId="stop1-select-label"
              id="stop1-select"
              name="stop1-select"
              defaultValue={0}
              value={stopX}
              label="Stops"
              onChange={handleStopx}
            >
              {stops.filter((stop) => stop !== stopY).map((stop) => (
                <MenuItem value={stop}>{stop}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: '2rem'}}>
            <InputLabel id="stop2-select-label">Stops</InputLabel>
            <Select
              labelId="stop2-select-label"
              id="stop2-select"
              defaultValue={0}
              value={stopY}
              label="Stops" 
              name="stop2-select"
              onChange={handleStopy}
            >
              {stops.filter((stop) => stop !== stopX).map((stop) => (
                <MenuItem value={stop}>{stop}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button type="submit" variant="outlined" color="inherit" sx={{ m: '2rem' }}>Submit</Button>
        </FormGroup>
      </form>
      {time &&
        <Zoom in={true} sx={{transitionDelay: '300ms'}} mountOnEnter  unmountOnExit>
          <h2>{time}</h2>
        </Zoom>
      }
    </div>
  );
};

export default Between;