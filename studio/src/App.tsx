import React from 'react';
import logo from './logo.svg';
import './App.css';
import { MainGrid } from './components/mainGrid';
import { Button } from '@mui/material';
import axios from 'axios';

function App() {

  const callURL = (url:string) => {
    axios.get(url);
  }

  return (
    <div className="App">
      {/* <MainGrid/> */}
      <Button sx={{margin: '10px'}} onClick={()=>{callURL("http://localhost:8000/led/off")}}>
        LED AUS
      </Button>
      <Button sx={{margin: '10px'}} onClick={()=>{callURL("http://localhost:8000/led/on")}}>
        LED AN
      </Button>
      <Button sx={{margin: '10px'}} onClick={()=>{callURL("http://localhost:8000/led/blink")}}>
        LED BLINK
      </Button>
      <Button sx={{margin: '10px'}} variant='contained' color='error' onClick={()=>{callURL("http://localhost:8000/led/stop")}}>
        LED STOP
      </Button>
    </div>
  );
}

export default App;
