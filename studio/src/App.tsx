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
      <Button sx={{margin: '10px'}} onClick={()=>{callURL("http://localhost:8000/effect/EA")}}>
        Effekt 1
      </Button>
      <Button sx={{margin: '10px'}} onClick={()=>{callURL("http://localhost:8000/effect/EB")}}>
        Effekt 2
      </Button>
      <Button sx={{margin: '10px'}} onClick={()=>{callURL("http://localhost:8000/effect/EC")}}>
        Effekt 3
      </Button>
      <Button sx={{margin: '10px'}} onClick={()=>{callURL("http://localhost:8000/effect/ED")}}>
        Effekt 4
      </Button>
    </div>
  );
}

export default App;
